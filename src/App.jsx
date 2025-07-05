import {
  SignIn,
  SignUp,
  SignedIn,
  SignedOut,
  UserButton,
  useUser
} from "@clerk/clerk-react";

function App() {
  const user = useUser()

  console.log(user)

  return (
    <div style={{ padding: 50 }}>
      <div>
        <SignedOut>
          <SignIn />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}

export default App;
