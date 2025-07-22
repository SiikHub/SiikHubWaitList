import requests
import json
import time
from datetime import datetime

# API base URL
BASE_URL = "http://localhost:8000"

def test_health_check():
    """Test comprehensive health check"""
    print("🏥 Testing Health Check...")
    try:
        response = requests.get(f"{BASE_URL}/health")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Health Status: {data['status']}")
            print(f"   Database: {data['database_status']}")
            print(f"   Total Entries: {data['total_entries']}")
            print(f"   Version: {data['version']}")
            return True
        else:
            print("❌ Health check failed")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to API. Make sure it's running on http://localhost:8000")
        print("💡 Run: python scripts/start_api.py")
        return False

def test_enhanced_signup():
    """Test enhanced signup with validation"""
    """Test enhanced signup with validation"""
    print("\n📝 Testing Enhanced Signup...")
    
    test_cases = [
        {"email": "john.doe@example.com", "source": "website"},
        {"email": "jane.smith@company.org", "source": "social"},
        {"email": "john.doe@example.com", "source": "website"},  # Duplicate
        {"email": "invalid-email", "source": "website"},  # Invalid email
        {"email": "test@domain.co.uk", "source": "referral"},
    ]
    
    for case in test_cases:
        try:
            response = requests.post(
                f"{BASE_URL}/api/waitlist/signup",
                json=case
            )
            
            data = response.json()
            
            if response.status_code == 200:
                print(f"✅ {case['email']}: {data['message']}")
                if data.get('position'):
                    print(f"   Position: #{data['position']}")
            else:
                print(f"❌ {case['email']}: {data.get('detail', 'Unknown error')}")
                
        except Exception as e:
            print(f"❌ {case['email']}: Error - {e}")

def test_comprehensive_stats():
    """Test comprehensive statistics"""
    print("\n📊 Testing Comprehensive Statistics...")
    try:
        response = requests.get(f"{BASE_URL}/api/waitlist/stats")
        
        if response.status_code == 200:
            stats = response.json()
            print("📈 Waitlist Statistics:")
            print(f"   Total Signups: {stats['total_signups']}")
            print(f"   Active Signups: {stats['active_signups']}")
            print(f"   Inactive Signups: {stats['inactive_signups']}")
            print(f"   Recent Signups (7 days): {stats['recent_signups']}")
            print(f"   Today's Signups: {stats['today_signups']}")
            print(f"   Average Daily Signups: {stats['average_daily_signups']}")
            print("   Top Sources:")
            for source in stats['top_sources']:
                print(f"     - {source['source']}: {source['count']}")
        else:
            print("❌ Failed to fetch statistics")
            
    except Exception as e:
        print(f"❌ Stats error: {e}")

def test_position_lookup():
    """Test position lookup"""
    print("\n🔍 Testing Position Lookup...")
    try:
        email = "john.doe@example.com"
        response = requests.get(f"{BASE_URL}/api/waitlist/position/{email}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Position for {email}:")
            print(f"   Position: #{data['position']}")
            print(f"   Joined: {data['joined_at']}")
            print(f"   Source: {data['source']}")
        else:
            print(f"❌ Position lookup failed: {response.json()}")
            
    except Exception as e:
        print(f"❌ Position lookup error: {e}")

def test_entries_pagination():
    """Test paginated entries endpoint"""
    print("\n📄 Testing Entries Pagination...")
    try:
        response = requests.get(f"{BASE_URL}/api/waitlist/entries?limit=3")
        
        if response.status_code == 200:
            entries = response.json()
            print(f"✅ Retrieved {len(entries)} entries:")
            for entry in entries:
                print(f"   #{entry['position']}: {entry['email']} ({entry['source']})")
        else:
            print("❌ Failed to fetch entries")
            
    except Exception as e:
        print(f"❌ Entries error: {e}")

def test_unsubscribe():
    """Test unsubscribe functionality"""
    print("\n🚫 Testing Unsubscribe...")
    try:
        email = "test@domain.co.uk"
        response = requests.delete(f"{BASE_URL}/api/waitlist/unsubscribe/{email}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Unsubscribed: {data['message']}")
        else:
            print(f"❌ Unsubscribe failed: {response.json()}")
            
    except Exception as e:
        print(f"❌ Unsubscribe error: {e}")

def test_export():
    """Test data export"""
    print("\n📤 Testing Data Export...")
    try:
        # Test JSON export
        response = requests.get(f"{BASE_URL}/api/waitlist/export?format=json")
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ JSON Export: {data['count']} entries exported")
        else:
            print("❌ JSON export failed")
        
        # Test CSV export
        response = requests.get(f"{BASE_URL}/api/waitlist/export?format=csv")
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ CSV Export: {data['count']} entries exported")
        else:
            print("❌ CSV export failed")
            
    except Exception as e:
        print(f"❌ Export error: {e}")

def main():
    print("🚀 Testing SiikHub Enhanced Waitlist API")
    print("=" * 50)
    
    # Test health check first
    if not test_health_check():
        print("\n💡 Start the API server first by running:")
        print("   python scripts/start_api.py")
        return
    
    # Run all tests
    test_enhanced_signup()
    test_comprehensive_stats()
    test_position_lookup()
    test_entries_pagination()
    test_unsubscribe()
    test_export()
    
    print("\n✨ Enhanced API testing completed!")
    print(f"🌐 View API docs at: {BASE_URL}/docs")
    print(f"📖 View ReDoc at: {BASE_URL}/redoc")

if __name__ == "__main__":
    main()
