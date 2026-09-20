export function isAuthorized(req){
  const token=req.headers.get('authorization')?.replace(/^Bearer\s+/i,'') || new URL(req.url).searchParams.get('token');
  return Boolean(process.env.ADMIN_TOKEN) && token===process.env.ADMIN_TOKEN;
}
