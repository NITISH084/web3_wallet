import { ThemeToggle } from "@/components/ui/Themetoggle"

const Nav = () => {
  return (
    <div className="fixed mb-2 w-screen p-2 text-2xl bg-zinc-300 dark:bg-gray-700 text-black dark:text-white flex flex-row justify-between items-center">
      <p>Web3 Wallet</p>
      <ThemeToggle/>
    </div>
  )
}
export default Nav