import { useEffect, useState } from "react"
import useWindowSize from "./useWindowSize"

const useHeightHeader = () => {
	const [heightHeader, setHeightHeader] = useState(0)
	const { width } = useWindowSize()
	useEffect(() => {
		const time = setTimeout(() => {
			const header = document.getElementById("main__header")
			if (header !== null) {
				setHeightHeader(header.offsetHeight)
			}
		}, 200)
		return () => {
			clearTimeout(time)
		}
	}, [window, document, width])
	return { heightHeader }
}

export default useHeightHeader
