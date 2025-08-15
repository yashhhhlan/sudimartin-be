import * as React from "react"

const Button = ({ className, ...props }: React.ComponentProps<"button">) => {
  return (
    <button
      data-slot="button"
      className={["text-sm font-light px-2 py-1 rounded-sm hover:text-white hover:bg-[#2196F3] dark:text-blue-500 data-[active=true]:text-white data-[active=true]:bg-[#2196F3]", className].join(' ')}
      {...props}
    />
  )
}

export { Button }
