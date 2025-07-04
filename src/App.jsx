import {
  SignIn,
  SignUp,
  SignedIn,
  SignedOut,
  UserButton
} from "@clerk/clerk-react";

function App() {
  return (
    <div style={{ padding: 50 }}>
      <SignedOut>
        <h2>Sign In</h2>
        <SignIn />

        <h2>Sign Up</h2>
        <SignUp />
      </SignedOut>

      <SignedIn>
        <h2>Welcome! 🎉</h2>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </div>
  );
}

export default App;
