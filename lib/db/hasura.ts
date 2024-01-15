import { MagicUserMetadata } from "@magic-sdk/admin";

export async function queryHasuraGQL(
  operationsDoc: string,
  operationName: string,
  variables: any,
  token: string,
) {
  const result = await fetch(
    process.env.NEXT_PUBLIC_HASURA_ADMIN_URL as string,
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-type": "aplication/json",
        "x-hasura-admin-secret": process.env
          .NEXT_PUBLIC_HASURA_ADMIN_SECRET as string,
      },
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName,
      }),
    },
  );

  return await result.json();
}

export async function isNewUser(token: string, issuer: string) {
  try {
    const user = await queryHasuraGQL(
      `query isNewUser($issuer: String!) {
        users(where: {issuer: {_eq: $issuer}})
        {
          id, 
          email,
          issuer
        }
      }`,
      "isNewUser",
      { issuer },
      token,
    );
    console.log({ user });

    return user?.data.users.length === 0;
  } catch (err) {
    console.log(err);
    throw Error(JSON.stringify(err));
  }
}

export async function createNewUser(
  token: string,
  metadata: MagicUserMetadata,
) {
  const { issuer, email, publicAddress } = metadata;

  try {
    const user = await queryHasuraGQL(
      `mutation createNewUser($email: String!, $issuer: String!, 
        $publicAddress: String!) {
        insert_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}){
      returning {
          email
          id
          issuer
        }}
      }
      `,
      "createNewUser",
      { issuer, email, publicAddress },
      token,
    );
    console.log("createNewUser", user);

    return user.data.insert_users;
  } catch (err) {
    console.log(err);
    throw Error(JSON.stringify(err));
  }
}

export const findVideoIdByUser = async ({
  videoId,
  userId,
  token,
}: {
  videoId: string;
  userId: string;
  token: string;
}): Promise<any[]> => {
  const queryDoc = `query findVideoIdByUser($userId: String!, $videoId: String) {
    stats(where: { userId: { _eq: $userId }, videoId: { _eq: $videoId } }) {
      favourited
      id
      userId
      videoId
      watched
    }
  }`;

  try {
    const stats = await queryHasuraGQL(
      queryDoc,
      "findVideoIdByUser",
      { videoId, userId },
      token,
    );
    console.log({ videoId, userId });
    console.log(stats.errors);

    return stats.data.stats || [];
  } catch (err) {
    console.log(err);
    throw Error(JSON.stringify(err));
  }
};

export const updateStats = async ({
  videoId,
  userId,
  token,
  favourited,
  watched,
}: {
  videoId: string;
  userId: string;
  token: string;
  favourited: 0 | 1;
  watched: boolean;
}) => {
  const updateStatsDoc = `mutation updateStats($userId: String!, $videoId: String!,
     $favourited: Int!, $watched: Boolean!) {
    update_stats(
      where: {
        userId: { _eq: $userId }
        videoId: { _eq: $videoId }
      }
      _set: {
        favourited: $favourited
        watched: $watched
      }
    ) {
      returning {
        favourited
        userId
        videoId
        watched
      }
    }
  }`;

  try {
    const stats = await queryHasuraGQL(
      updateStatsDoc,
      "updateStats",
      { videoId, userId, favourited, watched },
      token,
    );
    // console.log({ stats });

    return stats.data.update_stats.returning;
  } catch (err) {
    console.log(err);
    throw Error(JSON.stringify(err));
  }
};

export const createStats = async ({
  videoId,
  userId,
  token,
  favourited,
  watched,
}: {
  videoId: string;
  userId: string;
  token: string;
  favourited: 0 | 1;
  watched: boolean;
}) => {
  const insetStatsDoc = `mutation insertStats(
    $userId: String!, $videoId: String!, 
    $favourited: Int!, $watched: Boolean!) {
    insert_stats_one(object: {
      favourited: $favourited,
      watched: $watched,
      userId: $userId,
      videoId: $videoId
    }) {
      id
      favourited
      userId
    }
  }
 `;

  try {
    const stats = await queryHasuraGQL(
      insetStatsDoc,
      "insertStats",
      { videoId, userId, favourited, watched },
      token,
    );

    return stats.data.insert_stats_one;
  } catch (err) {
    console.log(err);
    throw Error(JSON.stringify(err));
  }
};
