import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { profileImage, profileImageUrl, imageGallery } = body

    // TODO: Add authentication check here
    // const session = await getServerSession(authOptions)
    // if (!session?.user?.id) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    // Make request to your actual backend API
    const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile/update`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        // Add auth headers if needed
      },
      body: JSON.stringify({
        profileImage: profileImage,
        profileImageUrl: profileImage,
        imageGallery: imageGallery
      })
    })

    if (!backendResponse.ok) {
      throw new Error('Backend update failed')
    }

    const backendData = await backendResponse.json()
    console.log('Backend response:', backendData)

    return NextResponse.json({ 
      success: true,
      message: 'Profile updated successfully',
      data: backendData
    })

  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    )
  }
}
