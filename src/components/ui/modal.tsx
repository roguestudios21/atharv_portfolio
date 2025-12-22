"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
    title?: string
    maxWidthClass?: string
}

export function Modal({ isOpen, onClose, children, title, maxWidthClass = "max-w-2xl" }: ModalProps) {
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-background/50 backdrop-blur-xl"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full ${maxWidthClass} p-6`}
                    >
                        <div className="bg-card/90 border border-white/10 rounded-2xl shadow-2xl overflow-hidden glass">
                            <div className="flex justify-between items-center p-6 border-b border-white/10">
                                <h2 className="text-2xl font-bold">{title}</h2>
                                <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-white/10">
                                    <X className="w-5 h-5" />
                                </Button>
                            </div>
                            <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                                {children}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
