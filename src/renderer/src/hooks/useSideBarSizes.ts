import { useState } from 'react'

export default function useSideBarSizes(){
  const [sideBarSizes, setSideBarSizes] = useState({
    sizes: [20, 80],
    gutterSize: 10
  })

  function toggleSideBar() {
    if (sideBarSizes.sizes[0] <= 5)
      setSideBarSizes({
        sizes: [20, 80],
        gutterSize: 10
      })
    else
      setSideBarSizes({
        sizes: [0, 100],
        gutterSize: 0
      })
  }

  return {sideBarSizes, setSideBarSizes, toggleSideBar}
}