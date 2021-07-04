import { ASYNC_STORAGE_AUTH } from "@/utils/auth";
import { cacheExchange } from "@auralous/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authExchange } from "@urql/exchange-auth";
import { createClient as createWSClient } from "graphql-ws";
import Config from "react-native-config";
import {
  createClient,
  dedupExchange,
  Exchange,
  fetchExchange,
  makeOperation,
  subscriptionExchange,
} from "urql";

const wsClient = createWSClient({
  url: `${Config.WEBSOCKET_URI}/graphql`,
});

export const createUrqlClient = () => {
  return createClient({
    url: `${Config.API_URI}/graphql`,
    exchanges: [
      dedupExchange,
      cacheExchange,
      authExchange<{ accessToken?: string | null }>({
        async getAuth({ authState }) {
          if (!authState) {
            return {
              accessToken: await AsyncStorage.getItem(ASYNC_STORAGE_AUTH),
            };
          }
          return null;
        },
        addAuthToOperation({ authState, operation }) {
          if (!authState?.accessToken) {
            return operation;
          }
          const fetchOptions =
            typeof operation.context.fetchOptions === "function"
              ? operation.context.fetchOptions()
              : operation.context.fetchOptions || {};
          return makeOperation(operation.kind, operation, {
            ...operation.context,
            fetchOptions: {
              ...fetchOptions,
              headers: {
                ...fetchOptions.headers,
                Authorization: authState.accessToken,
              },
            },
          });
        },
      }),
      fetchExchange,
      subscriptionExchange({
        forwardSubscription(operation) {
          return {
            subscribe: (sink) => {
              const dispose = wsClient.subscribe(operation, sink);
              return {
                unsubscribe: dispose,
              };
            },
          };
        },
      }),
    ].filter(Boolean) as Exchange[],
  });
};
