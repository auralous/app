export const FRAGMENT_USER_PUBLIC = /* GraphQL */ `
  fragment UserPublicParts on User {
    id
    username
    bio
    profilePicture
  }
`;

export const QUERY_CURRENT_USER = /* GraphQL */ `
  query me {
    me {
      ...UserPublicParts
    }
  }
  ${FRAGMENT_USER_PUBLIC}
`;

export const QUERY_USER = /* GraphQL */ `
  query user($username: String, $id: ID) {
    user(username: $username, id: $id) {
      ...UserPublicParts
    }
  }
  ${FRAGMENT_USER_PUBLIC}
`;

export const MUTATION_UPDATE_CURRENT_USER = /* GraphQL */ `
  mutation me($name: String, $username: String, $profilePicture: Upload) {
    me(name: $name, username: $username, profilePicture: $profilePicture) {
      ...UserPublicParts
    }
  }
  ${FRAGMENT_USER_PUBLIC}
`;

export const MUTATION_DISCONNECT_OAUTH = /* GraphQL */ `
  mutation deleteMeOauth($provider: OAuthProviderName!) {
    deleteMeOauth(provider: $provider)
  }
`;

export const MUTATION_DELETE_CURRENT_USER = /* GraphQL */ `
  mutation deleteMe {
    deleteMe
  }
`;

export const QUERY_CURRENT_USER_AUTH = /* GraphQL */ `
  query meAuth {
    meAuth {
      youtube {
        id
      }
      spotify {
        id
      }
      twitter {
        id
      }
      facebook {
        id
      }
    }
  }
`;
