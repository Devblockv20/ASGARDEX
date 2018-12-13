import ThorchainWasmClient from 'thorchain-wasm-client'
import { Client } from 'thorchain-wasm-client/dist/client/Client'
import { Runner } from 'thorchain-wasm-client/dist/runner/Runner'
import { env } from './env'

declare var Go: any

export interface IClient {
  client: Client,
  runner: Runner
}

// Cache
let client: IClient | null = null
let clientPromise: Promise<IClient>

/**
 * This setup is so that we don't load the client more than once
 * @returns {any}
 */
export const loadThorchainClient = () => {
  if (client) {
    clientPromise = Promise.resolve(client)
    return Promise.resolve(client)
  }

  if (clientPromise) {
    return clientPromise
  }

  clientPromise = ThorchainWasmClient(new Go(), env.REACT_APP_THORCHAIND_HOST).then((loadedClient: IClient) => {
    client = loadedClient
    return client
  })

  return clientPromise
}
