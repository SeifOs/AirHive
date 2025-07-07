export interface Printer {
  ip: string;
  name: string;
  x_coordinate: number;
  y_coordinate: number;
  z_coordinate: number;
  e_coordinate: number;
  heatbed_temperature: number;
  hotend_temperature: number;
  last_seen: string;
  printer_status: string;
  sd_card_files: string[];
  status: string;
}
