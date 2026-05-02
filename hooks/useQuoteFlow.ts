'use client'

import { useState, useEffect, useCallback } from 'react'
import type { PackageData, AddressData, MockResult, QuoteStep } from '@/types/quote'
import { computeMockResult } from '@/lib/quote-utils'

interface Saved {
  step:        QuoteStep
  packageData: PackageData | null
  addressData: AddressData | null
  mockResult:  MockResult  | null
}

const SESSION_KEY = 'bada_quote_v1'

function readSaved(): Partial<Saved> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    if (!raw) return {}
    return JSON.parse(raw) as Saved
  } catch {
    return {}
  }
}

export function useQuoteFlow() {
  const [step,        setStep]       = useState<QuoteStep>(() => readSaved().step        ?? 1)
  const [packageData, setPackageData] = useState<PackageData | null>(() => readSaved().packageData ?? null)
  const [addressData, setAddressData] = useState<AddressData | null>(() => readSaved().addressData ?? null)
  const [mockResult,  setMockResult]  = useState<MockResult  | null>(() => readSaved().mockResult  ?? null)

  // Persist to sessionStorage on every state change
  useEffect(() => {
    try {
      const payload: Saved = { step, packageData, addressData, mockResult }
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(payload))
    } catch { /* ignore quota errors */ }
  }, [step, packageData, addressData, mockResult])

  const setPackage = useCallback((data: PackageData) => {
    setPackageData(data)
    setStep(2)
  }, [])

  const setAddress = useCallback((data: AddressData, pkgData: PackageData) => {
    setAddressData(data)
    const result = computeMockResult(pkgData)
    setMockResult(result)
    setStep(3)
  }, [])

  // Go back to edit step n — data above n is cleared so result stays consistent
  const editStep = useCallback((n: QuoteStep) => {
    setStep(n)
    if (n <= 2) { setMockResult(null) }
    if (n <= 1) { setAddressData(null) }
    // packageData kept for form pre-fill when re-editing step 1
  }, [])

  const reset = useCallback(() => {
    setStep(1)
    setPackageData(null)
    setAddressData(null)
    setMockResult(null)
    try { sessionStorage.removeItem(SESSION_KEY) } catch {}
  }, [])

  return {
    step,
    packageData,
    addressData,
    mockResult,
    setPackage,
    setAddress,
    editStep,
    reset,
    isLocked:    (n: QuoteStep) => step < n,
    isCollapsed: (n: QuoteStep) => step > n,
    isActive:    (n: QuoteStep) => step === n,
  }
}
