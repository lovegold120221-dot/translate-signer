import {Application, Request, Response} from 'express';
import {paths} from './utils';
import {createProxyMiddleware} from 'http-proxy-middleware';
import * as http from 'http';
import {getGatewayConfig, getSignedLanguageGatewayConfig} from './config';

function signedLanguageFromRequest(req: Request) {
  return typeof req.query.signed === 'string' ? req.query.signed : null;
}

export function spokenToSigned(app: Application) {
  const {spokenTextToSignedPoseUrl, spokenTextToSignedVideoUrl} = getGatewayConfig();

  app.use(
    paths('spoken-text-to-signed-pose'),
    createProxyMiddleware({
      target: spokenTextToSignedPoseUrl,
      changeOrigin: true,
      router: (req: Request) => getSignedLanguageGatewayConfig(signedLanguageFromRequest(req)).spokenTextToSignedPoseUrl,
    })
  );

  app.use(
    paths('spoken-text-to-signed-video'),
    createProxyMiddleware({
      target: spokenTextToSignedVideoUrl,
      changeOrigin: true,
      router: (req: Request) =>
        getSignedLanguageGatewayConfig(signedLanguageFromRequest(req)).spokenTextToSignedVideoUrl,
      selfHandleResponse: true,
      on: {
        proxyRes: (proxyRes: http.IncomingMessage, req: Request, res: Response) => {
          proxyRes.pipe(res);
        },
      },
    })
  );
}
