import requests
import json
import time

# API base URL
BASE_URL = "http://localhost:8000"
2623233
def test_health_check():
    """Test if the API is running"""
    try:
        response = requests.get(f"{BASE_URL}/health")
        if response.status_code == 200:
            print("✅ Health check passed")
            return True
        else:
            print("❌ Health check failed")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to API. Make sure it's running on http://localhost:8000")
        return False

def test_waitlist_signup():
    """Test waitlist signup functionality"""
    test_emails = [
        "test1@example.com",
        "test2@example.com", 
        "test1@example.com",  # Duplicate to test handling
        "invalid-email",      # Invalid email to test validation
    ]
    
    print("\n🧪 Testing waitlist signup...")
    
    for email in test_emails:
        try:
            response = requests.post(
                f"{BASE_URL}/api/waitlist/signup",
                json={"email": email, "source": "test"}
            )
            
            data = response.json()
            
            if response.status_code == 200:
                print(f"✅ {email}: {data['message']}")
            else:
                print(f"❌ {email}: {data.get('message', 'Unknown error')}")
                
        except Exception as e:
            print(f"❌ {email}: Error - {e}")

def test_waitlist_stats():
    """Test waitlist statistics"""
    try:
        response = requests.get(f"{BASE_URL}/api/waitlist/stats")
        
        if response.status_code == 200:
            stats = response.json()
            print(f"\n📊 Waitlist Statistics:")
            print(f"   Total Signups: {stats['total_signups']}")
            print(f"   Active Signups: {stats['active_signups']}")
            print(f"   Recent Signups: {stats['recent_signups']}")
        else:
            print("❌ Failed to fetch statistics")
            
    except Exception as e:
        print(f"❌ Stats error: {e}")

def test_unsubscribe():
    """Test unsubscribe functionality"""
    try:
        response = requests.delete(f"{BASE_URL}/api/waitlist/unsubscribe/test2@example.com")
        
        if response.status_code == 200:
            print("✅ Unsubscribe test passed")
        else:
            print("❌ Unsubscribe test failed")
            
    except Exception as e:
        print(f"❌ Unsubscribe error: {e}")

def main():
    print("🚀 Testing SiikHub Waitlist API")
    print("=" * 40)
    
    # Test health check first
    if not test_health_check():
        print("\n💡 Start the API server first by running:")
        print("   python scripts/start_api.py")
        return
    
    # Run all tests
    test_waitlist_signup()
    test_waitlist_stats()
    test_unsubscribe()
    
    print("\n✨ Testing completed!")
    print(f"🌐 View API docs at: {BASE_URL}/docs")

if __name__ == "__main__":
    main()
