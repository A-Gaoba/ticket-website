import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='flex items-center justify-center h-screen'>
      <SignIn
        routing="path"
        path="/sign-in"
        appearance={{
          elements: {
            footerAction: { display: "none" }
          }
        }}
      />
    </div>
  )
}