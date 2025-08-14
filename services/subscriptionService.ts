import apiClient from '@/utils/apiClient';

export interface SubscriptionPlan {
  _id: string;
  name: string;
  planType: 'basic' | 'premium' | 'vip';
  stripePriceId: string;
  amount: number;
  currency: string;
  interval: 'month' | 'year';
  features: string[];
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface SubscriptionResponse {
  success: boolean;
  message: string;
  data: {
    plans: SubscriptionPlan[];
  };
}

export interface CreateSubscriptionResponse {
  success: boolean;
  message: string;
  data: {
    subscription: any;
    requiresPayment: boolean;
    plan?: SubscriptionPlan;
    clientSecret?: string;
  };
}

export interface CurrentSubscriptionResponse {
  success: boolean;
  message: string;
  data: {
    subscription: any;
    plan?: SubscriptionPlan;
  };
}

export interface CheckoutSessionResponse {
  success: boolean;
  url: string;
}

const SubscriptionService = {
  // Get all subscription plans
  getSubscriptionPlans: async (): Promise<SubscriptionResponse> => {
    try {
      const response = await apiClient.get('/subscription/plans');
      return response.data;
    } catch (error: any) {
      console.error('Error fetching subscription plans:', error);
      throw error;
    }
  },

  // Create subscription for user
  createSubscription: async (planType: string): Promise<CreateSubscriptionResponse> => {
    try {
      const response = await fetch(`${apiClient.defaults.baseURL}/subscription/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...apiClient.defaults.headers,
        },
        body: JSON.stringify({ planType }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create subscription');
      }

      const result = await response.json();
      
      // If it's a paid plan with checkout URL, redirect to Stripe
      if (result.data?.checkoutUrl) {
        window.location.href = result.data.checkoutUrl;
        return result;
      }
      
      return result;
    } catch (error: any) {
      console.error('Error creating subscription:', error);
      throw error;
    }
  },

  // Get user's current subscription
  getCurrentSubscription: async (): Promise<CurrentSubscriptionResponse> => {
    try {
      const response = await apiClient.get('/subscription/current');
      return response.data;
    } catch (error: any) {
      console.error('Error fetching current subscription:', error);
      throw error;
    }
  },

  // Cancel subscription
  cancelSubscription: async (cancelAtPeriodEnd: boolean = true, reason?: string): Promise<any> => {
    try {
      const response = await apiClient.post('/subscription/cancel', { 
        cancelAtPeriodEnd, 
        reason 
      });
      return response.data;
    } catch (error: any) {
      console.error('Error canceling subscription:', error);
      throw error;
    }
  },

  // Create a Stripe checkout session
  createCheckoutSession: async (priceId: string, userId: string): Promise<CheckoutSessionResponse> => {
    try {
      const response = await apiClient.post('/api/stripe/create-checkout-session', {
        priceId,
        userId
      });
      return response.data;
    } catch (error: any) {
      console.error('Error creating checkout session:', error);
      throw error;
    }
  }
};

export default SubscriptionService;
