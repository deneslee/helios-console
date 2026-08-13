import type { DbSchema } from './schema';

const hoursAgo = (h: number) => new Date(Date.now() - h * 3_600_000).toISOString();
const daysFromNow = (d: number) => new Date(Date.now() + d * 86_400_000).toISOString();

/** Edit this object to change everything the app shows. */
export const seed: DbSchema = {
  users: [
    { id: 'u1', name: 'Rina Halvorsen', role: 'Grid lead', email: 'rina@helios.io', shift: 'day', online: true },
    { id: 'u2', name: 'Marek Dvořák', role: 'Field technician', email: 'marek@helios.io', shift: 'day', online: true },
    { id: 'u3', name: 'Aisha Bello', role: 'Inverter specialist', email: 'aisha@helios.io', shift: 'night', online: false },
    { id: 'u4', name: 'Tomás Riera', role: 'SCADA engineer', email: 'tomas@helios.io', shift: 'on_call', online: true },
    { id: 'u5', name: 'Lena Fischer', role: 'Compliance', email: 'lena@helios.io', shift: 'day', online: false },
  ],
  sites: [
    { id: 's1', name: 'Vale Norte', region: 'Iberia', status: 'online', capacityMw: 140, outputMw: 121.4, uptime: 99.6, leadId: 'u1', commissionedAt: '2021-04-12' },
    { id: 's2', name: 'Kestrel Flats', region: 'North Sea', status: 'degraded', capacityMw: 86, outputMw: 41.2, uptime: 94.1, leadId: 'u2', commissionedAt: '2022-09-30' },
    { id: 's3', name: 'Dorn Ridge', region: 'Alpine', status: 'online', capacityMw: 62, outputMw: 58.9, uptime: 99.9, leadId: 'u4', commissionedAt: '2020-06-01' },
    { id: 's4', name: 'Saltmarsh 2', region: 'North Sea', status: 'offline', capacityMw: 48, outputMw: 0, uptime: 71.5, leadId: 'u3', commissionedAt: '2019-11-18' },
    { id: 's5', name: 'Aurelia West', region: 'Iberia', status: 'commissioning', capacityMw: 210, outputMw: 12.8, uptime: 88.0, leadId: 'u1', commissionedAt: '2026-02-02' },
    { id: 's6', name: 'Pelican Bay', region: 'Atlantic', status: 'online', capacityMw: 95, outputMw: 90.2, uptime: 98.7, leadId: 'u2', commissionedAt: '2023-03-22' },
  ],
  workOrders: [
    { id: 'w1', title: 'Replace string inverter B12', siteId: 's2', assigneeId: 'u3', status: 'in_progress', priority: 'critical', dueAt: daysFromNow(0) },
    { id: 'w2', title: 'Quarterly thermal scan', siteId: 's1', assigneeId: 'u2', status: 'open', priority: 'normal', dueAt: daysFromNow(4) },
    { id: 'w3', title: 'Recalibrate irradiance sensors', siteId: 's3', assigneeId: 'u4', status: 'open', priority: 'low', dueAt: daysFromNow(9) },
    { id: 'w4', title: 'Substation breaker inspection', siteId: 's4', assigneeId: 'u2', status: 'blocked', priority: 'high', dueAt: daysFromNow(1) },
    { id: 'w5', title: 'Commissioning checklist — block 3', siteId: 's5', assigneeId: 'u1', status: 'in_progress', priority: 'high', dueAt: daysFromNow(2) },
    { id: 'w6', title: 'Vegetation clearing, south fence', siteId: 's6', assigneeId: 'u2', status: 'done', priority: 'low', dueAt: daysFromNow(-3) },
    { id: 'w7', title: 'Firmware rollout 4.8.2', siteId: 's1', assigneeId: 'u4', status: 'open', priority: 'normal', dueAt: daysFromNow(6) },
    { id: 'w8', title: 'Grid code compliance filing', siteId: 's5', assigneeId: 'u5', status: 'open', priority: 'high', dueAt: daysFromNow(3) },
  ],
  alerts: [
    { id: 'a1', title: 'Inverter B12 offline', detail: 'No telemetry for 42 minutes. Breaker trip suspected.', severity: 'critical', siteId: 's2', createdAt: hoursAgo(0.7), acknowledged: false },
    { id: 'a2', title: 'Output below forecast', detail: 'Vale Norte is 13% under the day-ahead curve.', severity: 'warning', siteId: 's1', createdAt: hoursAgo(3), acknowledged: false },
    { id: 'a3', title: 'Saltmarsh 2 still isolated', detail: 'Manual isolation held since the storm window.', severity: 'critical', siteId: 's4', createdAt: hoursAgo(11), acknowledged: true },
    { id: 'a4', title: 'Firmware 4.8.2 available', detail: 'Vendor published a stability patch for the SG-3 series.', severity: 'info', siteId: 's3', createdAt: hoursAgo(26), acknowledged: true },
    { id: 'a5', title: 'Wind load nearing threshold', detail: 'Gusts at 21 m/s on the north array.', severity: 'warning', siteId: 's6', createdAt: hoursAgo(5), acknowledged: false },
  ],
};
