import HeaderBox from '@/components/HeaderBox'
import RecentTransactions from '@/components/RecurringBillTransactions';
import RightSidebar from '@/components/RightSideBar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getLoggedInUser } from '@/lib/actions/user.actions';

const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const loggedIn = await getLoggedInUser();
      return (
        <div>Home</div>
      )
    
    


//   return (
//     <section className="home">
//       <div className="home-content">
//         <header className="home-header">
//           <HeaderBox 
//             type="greeting"
//             title="Welcome"
//             user={loggedIn?.firstName || 'Guest'}
//             subtext="Access and manage your account and transactions efficiently."
//           />

//           <TotalBalanceBox 
//             accounts={accountsData}
//             totalBanks={accounts?.totalBanks}
//             totalCurrentBalance={accounts?.totalCurrentBalance}
//           />
//         </header>

//         <RecentTransactions 
//           accounts={accountsData}
//           transactions={account?.transactions}
//           appwriteItemId={appwriteItemId}
//           page={currentPage}
//         />
//       </div>

//       <RightSidebar 
//         user={loggedIn}
//         transactions={account?.transactions}
//         banks={accountsData?.slice(0, 2)}
//       />
//     </section>
//   )
}

export default Home