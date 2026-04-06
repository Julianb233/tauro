-- Add buyer and seller values to user_role enum
ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'buyer';
ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'seller';
