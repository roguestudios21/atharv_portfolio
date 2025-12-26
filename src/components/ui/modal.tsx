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
                        className="fixed inset-0 z-[60] bg-background/60 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-full ${maxWidthClass} p-6`}
                    >
                        <div className="bg-card border border-border/50 rounded-[32px] shadow-2xl overflow-hidden">
                            <div className="flex justify-between items-center p-8 border-b border-border/50 bg-secondary/30">
                                <h2 className="text-3xl font-bold tracking-tight text-foreground">{title}</h2>
                                <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full w-12 h-12 hover:bg-secondary text-foreground transition-all">
                                    <X className="w-6 h-6" />
                                </Button>
                            </div>
                            <div className="p-8 max-h-[75vh] overflow-y-auto no-scrollbar bg-card">
                                {children}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
