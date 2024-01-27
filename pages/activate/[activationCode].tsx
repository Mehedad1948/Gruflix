import { verifyToken } from '@/lib/utils/verifiyToken';
import { useRouter } from 'next/router';

const Activate = () => {
    const router = useRouter()
    console.log(router);
    
    // const data = verifyToken()
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      hi
    </div>
  );
};

export default Activate;
