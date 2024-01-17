import { verifyToken } from "@/lib/utils/verifiyToken";
import { GetServerSidePropsContext } from "next";

const redirectUser = async (context: GetServerSidePropsContext) => {
  const { token = null } = context.req.cookies;
  if (!token)
    return {
      props: {},
      token, userId: '',
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
    
  const userId = await verifyToken(token) || null;

  if (!userId) {
    return {
      props: {},
       token, userId: '',
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return { token, userId };
};

export default redirectUser;
