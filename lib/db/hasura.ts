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

export async function findUserByEmail(token: string, email: string) {
  try {
    const user = await queryHasuraGQL(
      `query FindUserByEmail($email: String!) {
        users(where: {email: {_eq: $email}}) {
          accounts {
            type
            provider
          }
          password
          name
          email
        }
      }
      `,
      "FindUserByEmail",
      { email },
      token,
    );

    return user?.data.users[0];
  } catch (err) {
    console.log(err);
    return null;
    // throw Error(JSON.stringify(err));
  }
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

    return user?.data.users.length === 0;
  } catch (err) {
    console.log(err);
    throw Error(JSON.stringify(err));
  }
}

export async function createNewUser(
  token: string,
  email: string,
  password: string,
) {
  try {
    const user = await queryHasuraGQL(
      `mutation createNewUser($email: String!, $password: String!) {
        insert_users(objects: {email: $email, password: $password}){
      returning {
          email
          id
          issuer
        }}
      }
      `,
      "createNewUser",
      { email, password },
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
  const queryDoc = `query findVideoIdByUser($userId: uuid!, $videoId: String) {
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
  const updateStatsDoc = `mutation updateStats($userId: uuid!, $videoId: String!,
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
    $userId: uuid!, $videoId: String!, 
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

export const createVideo = async ({
  videoId,
  token,
  title,
  channelId,
}: {
  videoId: string;
  title: string;
  channelId: string;
  token: string;
}) => {
  const insertVideoAndStats = `mutation InsertVideoAndStats(
    $title: String!,
    $channelId: String!,
    $videoId: String!,
    $userId: String!,
    $favourited: Int!,
    $watched: Boolean!
  ) {
    insert_videos_one(object: {
      title: $title,
      channelId: $channelId,
      videoId: $videoId
    }) {
      id
    }
  
    insert_stats_one(object: {
      favourited: $favourited,
      watched: true,
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
    const video = await queryHasuraGQL(
      insertVideoAndStats,
      "InsertVideoAndStats",
      { videoId, title, channelId },
      token,
    );

    return video.data;
  } catch (err) {
    console.log(err);
    throw Error(JSON.stringify(err));
  }
};

export const getWatchedVideos = async ({
  userId,
  token,
}: {
  userId: string;
  token: string;
}): Promise<{ favourited: 0 | 1; videoId: string }[]> => {
  const getWatchedDoc = `query getWatched(
    $userId: uuid!) {
    stats(where: {
      watched: {_eq: true},
      userId: {_eq: $userId},
    }) {
      favourited
      videoId
    }
  }
 `;

  try {
    const wathcedVideos = await queryHasuraGQL(
      getWatchedDoc,
      "getWatched",
      { userId },
      token,
    );
    console.log(wathcedVideos.errors);

    return wathcedVideos.data.stats;
  } catch (err) {
    console.log("err", err);
    throw new Error(err as string);
  }
};

export const getFavouritedVideos = async ({
  userId,
  token,
}: {
  userId: string;
  token: string;
}): Promise<{ favourited: 0 | 1; videoId: string; watched: boolean }[]> => {
  const getFavouritedVideosDoc = `query getFavouritedVideos(
    $userId: String!) {
    stats(where: {
      favourited: {_eq: 1},
      userId: {_eq: $userId},
    }) {
      favourited
      videoId
      watched
    }
  }
 `;
  // console.log({ token });

  try {
    const favouritedVideos = await queryHasuraGQL(
      getFavouritedVideosDoc,
      "getFavouritedVideos",
      { userId },
      token,
    );

    return favouritedVideos.data.stats;
  } catch (err) {
    console.error(err);
    throw Error(JSON.stringify(err));
  }
};
