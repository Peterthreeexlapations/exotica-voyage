const NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "13057650043";

type VehicleLike = { year: number; make: string; model: string };
type YachtLike = { year: number; builder: string; model: string };
type AircraftLike = { year: number; manufacturer: string; model: string };

export const whatsappMessages = {
  // Cars
  vehicleReserve: (v: VehicleLike) =>
    `Hi Exotica Voyage Group — I'm interested in booking the ${v.year} ${v.make} ${v.model}. Could you share availability and rates?`,
  vehicleQuestion: (v: VehicleLike) =>
    `Hi — I have a question about the ${v.year} ${v.make} ${v.model}.`,
  vehicleUnavailable: (v: VehicleLike) =>
    `Hi Exotica Voyage Group — the ${v.year} ${v.make} ${v.model} is listed as unavailable. Could you suggest a similar vehicle?`,

  // Yachts
  yachtCharter: (y: YachtLike) =>
    `Hi Exotica Voyage Group — I'm interested in chartering the ${y.year} ${y.builder} ${y.model}. Could you share availability, rates, and crew details?`,
  yachtQuestion: (y: YachtLike) =>
    `Hi — I have a question about the ${y.year} ${y.builder} ${y.model}.`,
  yachtUnavailable: (y: YachtLike) =>
    `Hi Exotica Voyage Group — the ${y.year} ${y.builder} ${y.model} is listed as unavailable. Could you suggest a similar vessel?`,

  // Aircraft
  aircraftArrange: (a: AircraftLike) =>
    `Hi Exotica Voyage Group — I'd like to arrange a flight on the ${a.year} ${a.manufacturer} ${a.model}. Could you share an hourly rate and availability for my route?`,
  aircraftQuestion: (a: AircraftLike) =>
    `Hi — I have a question about the ${a.year} ${a.manufacturer} ${a.model}.`,
  aircraftUnavailable: (a: AircraftLike) =>
    `Hi Exotica Voyage Group — the ${a.year} ${a.manufacturer} ${a.model} is listed as unavailable. Could you suggest a similar aircraft?`,

  // Generic
  generic: () =>
    `Hi Exotica Voyage Group — I'd like to discuss a reservation. Could you share what's currently available?`,
  fleet: () =>
    `Hi Exotica Voyage Group — I'd like to discuss an exotic car reservation from your fleet.`,
  marina: () =>
    `Hi Exotica Voyage Group — I'd like to discuss a yacht charter from your fleet.`,
  hangar: () =>
    `Hi Exotica Voyage Group — I'd like to discuss arranging a private flight.`,

  // Concierge / Other services
  concierge: () =>
    `Hi Exotica Voyage Group — I'd like to discuss concierge services beyond the fleet. Could you share what's available?`,
  conciergeService: (service: string) =>
    `Hi Exotica Voyage Group — I'd like to inquire about ${service}. Could you share availability and rates?`,
};

export function whatsappLink(message: string): string {
  return `https://wa.me/${NUMBER}?text=${encodeURIComponent(message)}`;
}
