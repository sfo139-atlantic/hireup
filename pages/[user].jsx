import { useRouter } from 'next/router';

export default function User() {
  const router = useRouter();
  const { user } = router.query;
  return <h1 style={{textAlign: 'center', fontSize: '3rem'}}>Hello { user }</h1>
}