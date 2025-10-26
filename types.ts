
export interface LatLng {
  latitude: number;
  longitude: number;
}

export interface GeolocationState {
  location: LatLng | null;
  loading: boolean;
  error: string | null;
}

export interface GroundingChunk {
  maps: {
    uri: string;
    title: string;
  };
}

export interface GeminiResponse {
  text: string;
  sources: GroundingChunk[];
}
