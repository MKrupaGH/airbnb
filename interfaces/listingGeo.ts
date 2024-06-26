interface ListingGeo {
  type: string;
  geometry: Geometry;
  properties: Properties;
}

interface Properties {
  id: number;
  name: string;
  host_id: number;
  neighbourhood: string;
  room_type: string;
  column_10: number;
  minimum_nights: number;
  number_of_reviews: number;
  last_review: string;
  reviews_per_month: number;
  calculated_host_listings_count: number;
  availability_365: number;
  updated_date: string;
  city: string;
  column_19: string;
  column_20: string;
}

interface Geometry {
  type: string;
  coordinates: number[];
}
