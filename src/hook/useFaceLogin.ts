"use client";
import { URL_API } from "@/lib/fetcher";
import { useState, useRef, useCallback, useEffect } from "react";

const MODEL_URL = "/models";
const THRESHOLD = 0.5;
const SCAN_INTERVAL = 300;

export type FaceLoginStep =
  | "idle"
  | "loading"
  | "scanning"
  | "success"
  | "error";
export type FaceStatus = "idle" | "detecting" | "matched" | "failed";

interface UseFaceLoginProps {
  email: string;
  onSuccess: (data: { accessToken: string; message: string }) => void;
}

export function useFaceLogin({ email, onSuccess }: UseFaceLoginProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const faceapiRef = useRef<any>(null);
  const referenceDescriptorRef = useRef<Float32Array | null>(null);
  const failCountRef = useRef(0);
  const MAX_FAIL = 10; // sau 10 lần không khớp → dừng
  const [step, setStep] = useState<FaceLoginStep>("idle");
  const [faceStatus, setFaceStatus] = useState<FaceStatus>("idle");
  const [message, setMessage] = useState("");

  const stopCamera = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  const reset = useCallback(() => {
    stopCamera();
    failCountRef.current = 0; // ← thêm dòng này
    setStep("idle");
    setFaceStatus("idle");
    setMessage("");
  }, [stopCamera]);

  const drawBox = useCallback((detection: any, color: string) => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const faceapi = faceapiRef.current;
    if (!canvas || !video || !faceapi) return;

    const dims = faceapi.matchDimensions(canvas, video, true);
    const resized = faceapi.resizeResults(detection, dims);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const { x, y, width, height } = resized.detection.box;
    const len = 20;
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(x, y + len);
    ctx.lineTo(x, y);
    ctx.lineTo(x + len, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x + width - len, y);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x + width, y + len);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y + height - len);
    ctx.lineTo(x, y + height);
    ctx.lineTo(x + len, y + height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x + width - len, y + height);
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x + width, y + height - len);
    ctx.stroke();

    faceapi.draw.drawFaceLandmarks(canvas, resized);
  }, []);

  const startDetection = useCallback(() => {
    const faceapi = faceapiRef.current;
    const referenceDescriptor = referenceDescriptorRef.current;
    if (!faceapi || !referenceDescriptor) return;

    intervalRef.current = setInterval(async () => {
      const video = videoRef.current;
      if (!video || video.readyState < 2) return;

      const detection = await faceapi
        .detectSingleFace(
          video,
          new faceapi.SsdMobilenetv1Options({ minConfidence: 0.7 }),
        )
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (!detection) {
        setFaceStatus("idle");
        setMessage("Đưa khuôn mặt vào khung hình...");
        canvasRef.current
          ?.getContext("2d")
          ?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        return;
      }

      const distance = faceapi.euclideanDistance(
        detection.descriptor,
        referenceDescriptor,
      );

      if (distance < THRESHOLD) {
        failCountRef.current = 0; // reset khi khớp
        drawBox(detection, "#22c55e");
        setFaceStatus("matched");
        setMessage("Đang xác thực...");
        if (intervalRef.current) clearInterval(intervalRef.current);

        const loginRes = await fetch(`${URL_API}/api/auth/login/face`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            email,
            descriptor: Array.from(detection.descriptor),
          }),
        });
        const loginData = await loginRes.json();

        if (loginRes.ok) {
          stopCamera();
          setStep("success");
          setMessage("Đăng nhập thành công!");
          onSuccess(loginData);
        } else {
          setFaceStatus("failed");
          setMessage(loginData.message || "Xác thực thất bại");
          setTimeout(() => {
            setFaceStatus("idle");
            setMessage("Đưa khuôn mặt vào khung hình...");
          }, 2000);
        }
      } else {
        failCountRef.current += 1;

        const remaining = MAX_FAIL - failCountRef.current;

        if (failCountRef.current >= MAX_FAIL) {
          // Hết lượt — dừng hẳn
          if (intervalRef.current) clearInterval(intervalRef.current);
          drawBox(detection, "#ef4444");
          setFaceStatus("failed");
          setStep("error");
          setMessage(
            "Không nhận ra khuôn mặt. Vui lòng thử lại hoặc đăng nhập bằng mật khẩu.",
          );
        } else {
          drawBox(detection, "#ef4444");
          setFaceStatus("detecting");
          setMessage(`Khuôn mặt chưa khớp — còn ${remaining} lần thử`);
        }
      }
    }, SCAN_INTERVAL);
  }, [email, drawBox, stopCamera, onSuccess]);

  const startFaceScan = useCallback(async () => {
    if (!email.trim()) {
      setMessage("Vui lòng nhập email trước");
      return;
    }

    try {
      setStep("loading");
      setMessage("Đang tải mô hình nhận diện...");

      const faceapi = await import("face-api.js");
      faceapiRef.current = faceapi;

      await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      ]);

      setMessage("Đang lấy dữ liệu khuôn mặt...");

      const res = await fetch(`${URL_API}/api/auth/login/face/descriptor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.message || "Không thể lấy dữ liệu khuôn mặt");

      referenceDescriptorRef.current = new Float32Array(data.faceDescriptor);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user",
        },
        audio: false,
      });
      streamRef.current = stream;

      // ✅ Set step TRƯỚC → React render <video> vào DOM
      setStep("scanning");
      setFaceStatus("idle");
      setMessage("Đang khởi động camera...");

      // ✅ Đợi React render (100ms) rồi mới gán srcObject
      setTimeout(() => {
        const video = videoRef.current;
        if (!video) {
          console.error("videoRef vẫn null sau timeout");
          return;
        }
        video.srcObject = stream;
        video.onloadedmetadata = () => {
          video
            .play()
            .then(() => {
              setMessage("Đưa khuôn mặt vào khung hình...");
              startDetection();
            })
            .catch(console.error);
        };
      }, 100);
    } catch (err: any) {
      stopCamera();
      setStep("error");
      setMessage(err.message || "Đã xảy ra lỗi");
    }
  }, [email, stopCamera, startDetection]);

  useEffect(() => () => stopCamera(), [stopCamera]);

  return {
    videoRef,
    canvasRef,
    step,
    faceStatus,
    message,
    startFaceScan,
    reset,
  };
}
