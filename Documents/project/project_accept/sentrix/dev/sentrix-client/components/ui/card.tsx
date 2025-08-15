import * as React from "react"

const Card = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="card"
      className={["panel", className].join(' ')}
      {...props}
    />
  )
}

const CardHeader = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="card-header"
      className={["mb-5 flex flex-col xl:flex-row gap-2 xl:gap-4 lg:items-center justify-between dark:border-[#1b2e4b] dark:text-white-light", className].join(' ')}
      {...props}
    />
  )
}

const CardTitle = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="card-title"
      className={["mb-5 flex gap-2 items-center p-5 justify-between dark:border-[#1b2e4b] dark:text-white-light", className].join(' ')}
      {...props}
    />
  )
}

const CardContent = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="card-content"
      className={["bg-white dark:bg-black", className].join(' ')}
      {...props}
    />
  )
}

export { Card, CardHeader, CardTitle, CardContent }
