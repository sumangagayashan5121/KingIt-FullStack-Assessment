import { UserList } from "./components/users/userList";
import { Winners } from "./components/users/Winners";

function App() {
  return (
    <div className='w-[100vw] flex items-center flex-col  py-10 space-y-16'>
      <UserList />
      <Winners />
    </div>
  );
}

export default App;
