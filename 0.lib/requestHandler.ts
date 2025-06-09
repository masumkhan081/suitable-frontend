const reqUrlMap = {
  signup: "/api/auth/signup",
  login: "/api/auth/login",
  resetPassword: "/api/auth/reset-password",
  resetRequest: "/api/auth/reset-request",
};

type TypeGetHandlerProps = keyof typeof reqUrlMap;

type TypePostHandlerProps = {
  urlKey: keyof typeof reqUrlMap;
  data: object;
};
type TypePatchHandlerProps = {
  urlKey: keyof typeof reqUrlMap;
  rsrcId: string;
  data: object;
};
type TypeDeleteHandlerProps = {
  urlKey: keyof typeof reqUrlMap;
  rsrcId: string;
};

async function getHandler({ urlKey }: { urlKey: TypeGetHandlerProps }) {
  const url = reqUrlMap[urlKey];
  console.log(url);
}

async function postHandler({ urlKey, data }: TypePostHandlerProps) {
  const url = reqUrlMap[urlKey];
  console.log(url, data);
}

async function patchHandler({ urlKey, data, rsrcId }: TypePatchHandlerProps) {
  const url = reqUrlMap[urlKey];
  console.log(url, data, rsrcId);
}

async function deleteHandler({ urlKey, rsrcId }: TypeDeleteHandlerProps) {
  const url = reqUrlMap[urlKey];
  console.log(url, rsrcId);
}

export { getHandler, postHandler, patchHandler, deleteHandler };
