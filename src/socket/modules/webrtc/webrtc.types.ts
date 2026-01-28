type WebRTCOfferPayload = {
  roomId: string;
  fromUserId: string;
  toUserId: string;
  sdp: unknown;
};

type WebRTCAnswerPayload = {
  roomId: string;
  fromUserId: string;
  toUserId: string;
  sdp: unknown;
};

type WebRTCIcePayload = {
  roomId: string;
  fromUserId: string;
  toUserId: string;
  candidate: unknown;
};

export type { WebRTCOfferPayload, WebRTCAnswerPayload, WebRTCIcePayload };
