import type React from "react";
import * as motion from "motion/react-client"

interface MotionDivWrapperInterface {
    children: React.ReactNode,
}

export default function MotionDivWrapper( { children }: MotionDivWrapperInterface ) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut"  }}
        >
            { children }
        </motion.div>
    )
}