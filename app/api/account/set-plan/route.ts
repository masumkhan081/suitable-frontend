import { NextRequest, NextResponse } from 'next/server';
import apiClient from '@/utils/apiClient';

export async function POST(req: NextRequest) {
  try {
    const { userId, planType } = await req.json();
    
    // Validate required fields
    if (!planType || !userId) {
      return NextResponse.json({
        success: false, 
        message: 'User ID and plan type are required',
        error: { code: 400, details: ['User ID and plan type are required'] }
      }, { status: 400 });
    }
    
    // Get auth token from the request headers
    const authToken = req.headers.get('authorization')?.split(' ')[1];
    if (!authToken) {
      return NextResponse.json({
        success: false, 
        message: 'Authentication required',
        error: { code: 401, details: ['Authentication required'] }
      }, { status: 401 });
    }
    
    // Only allow setting free plans through this endpoint
    if (planType !== 'basic') {
      return NextResponse.json({
        success: false, 
        message: 'This endpoint is only for free plans',
        error: { code: 400, details: ['This endpoint is only for free plans'] }
      }, { status: 400 });
    }
    
    // Call backend API to create a free subscription
    const response = await apiClient.post('/subscription', { planType });
    
    return NextResponse.json({
      success: true,
      message: 'Free plan activated successfully',
      data: response.data.data || response.data
    });
  } catch (error: any) {
    console.error('Error setting free plan:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to set free plan',
      error: { 
        code: 500, 
        details: [error.message] 
      }
    }, { status: 500 });
  }
}
