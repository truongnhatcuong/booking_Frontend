"use client";

import { formatDate } from "@/lib/formatDate";
import { formatPrice } from "@/lib/formatPrice";
import React from "react";

type ColumnType = "number" | "currency" | "percent" | "text";

type TableColumn = {
  key: string;
  label: string;
  type?: ColumnType;
};

type TableData = {
  title: string;
  columns: TableColumn[];
  rows: Array<Record<string, any>>;
};

export type MiniStatsTablePayload = {
  kind: "MINI_STATS_TABLE";
  period: {
    label: string;
    from: string; // ISO
    to: string; // ISO
    timezone?: string; // optional, vd "Asia/Ho_Chi_Minh"
  };
  tables: TableData[];
};

function detectCellType(
  col: TableColumn,
  row: Record<string, any>
): ColumnType {
  // ưu tiên row.type (hữu ích cho KPI revenue)
  const rowType = row?.type as ColumnType | undefined;
  return rowType || col.type || "text";
}

function renderCell(value: any, type: ColumnType) {
  if (value === null || value === undefined || value === "") return "—";
  if (type === "currency") return formatPrice(Number(value) || 0);
  if (type === "percent") return `${Number(value) || 0}%`;
  if (type === "number")
    return new Intl.NumberFormat("vi-VN").format(Number(value) || 0);
  return String(value);
}

function isKpiTable(t: TableData) {
  // KPI table thường có metric/value
  return (
    t.rows?.length > 0 &&
    t.rows.every(
      (r) =>
        Object.prototype.hasOwnProperty.call(r, "metric") &&
        Object.prototype.hasOwnProperty.call(r, "value")
    )
  );
}

function KpiCards({ table }: { table: TableData }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {table.rows.map((r, idx) => {
        const isCurrency = (r?.type as ColumnType) === "currency";
        const value = isCurrency
          ? formatPrice(Number(r.value || 0))
          : renderCell(r.value, "number");
        return (
          <div key={idx} className="rounded-2xl border bg-white p-4 shadow-sm">
            <div className="text-sm text-gray-500 ">{r.metric}</div>
            <div className="mt-1 text-2xl font-semibold text-gray-900">
              {value}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DataTable({ table }: { table: TableData }) {
  const { columns, rows } = table;

  return (
    <div className="rounded-2xl border bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        <h3 className="text-base font-semibold text-gray-900 ">
          {table.title}
        </h3>
        <div className="text-xs text-gray-500">{rows?.length || 0} dòng</div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-t text-sm">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((c, idx) => (
                <th
                  key={c.key}
                  className={`whitespace-nowrap px-4 py-3 ${
                    idx === 0 ? "text-left" : "text-center"
                  } font-medium text-gray-700`}
                >
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {(!rows || rows.length === 0) && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-6 text-center text-gray-500"
                >
                  Chưa có dữ liệu
                </td>
              </tr>
            )}

            {rows?.map((r, i) => (
              <tr
                key={i}
                className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}
              >
                {columns.map((c) => {
                  const type = detectCellType(c, r);
                  const raw = r?.[c.key];
                  const text = renderCell(raw, type);

                  const isRight =
                    type === "currency" ||
                    type === "number" ||
                    type === "percent";

                  return (
                    <td
                      key={c.key}
                      className={[
                        "px-4 py-3",
                        "whitespace-nowrap",
                        isRight ? "text-center tabular-nums" : "text-left",
                      ].join(" ")}
                    >
                      {text}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function MiniStatsDashboard({
  payload,
}: {
  payload: MiniStatsTablePayload;
}) {
  const fromText = formatDate(payload.period.from);
  const toText = formatDate(payload.period.to);

  const kpi = payload.tables.find(isKpiTable);
  const rest = payload.tables.filter((t) => t !== kpi);

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-sm text-gray-500">Báo cáo</div>
            <div className="text-xl font-semibold text-gray-900">
              {payload.period.label}
            </div>
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-medium">Từ:</span> {fromText}{" "}
            <span className="mx-2">→</span>{" "}
            <span className="font-medium">Đến:</span> {toText}
          </div>
        </div>
      </div>

      {kpi ? <KpiCards table={kpi} /> : null}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 items-center ">
        {rest.map((t, idx) => (
          <DataTable key={idx} table={t} />
        ))}
      </div>
    </div>
  );
}
