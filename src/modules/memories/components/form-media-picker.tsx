'use client'

import React from 'react'

export const FormMediaPicker = () => {
  const [preview, setPreview] = React.useState<string | null>(null)

  function onMediaSelected (e: React.ChangeEvent<HTMLInputElement>) {
    const { files } = e.target

    if (!files) {
      return
    }

    const previewURL = URL.createObjectURL(files[0])

    setPreview(previewURL)
  }

  return (
    <>
      <input name='coverUrl' accept="image/*" type="file" id="media" className="hidden" onChange={onMediaSelected} />
      {preview && <img src={preview} alt="" className="w-full aspect-video rounded-lg object-cover" />}
    </>
  )
}
