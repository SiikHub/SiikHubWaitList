import subprocess
import sys
import os

def install_requirements():
    """Install required packages"""
    packages = [
        "fastapi",
        "uvicorn[standard]",
        "pydantic[email]",
        "python-multipart",
        "sqlalchemy",
        "python-jose[cryptography]"
    ]
    
    print("📦 Installing Python packages...")
    for package in packages:
        print(f"Installing {package}...")
        try:
            subprocess.check_call([sys.executable, "-m", "pip", "install", package], 
                                stdout=subprocess.DEVNULL, 
                                stderr=subprocess.DEVNULL)
        except subprocess.CalledProcessError as e:
            print(f"   ❌ Failed to install {package}: {e}")
            return False
    
    print("   ✅ All packages installed successfully!")
    return True

def start_server():
    """Start the FastAPI server"""
    print("\n🚀 Starting SiikHub Waitlist API v2.0...")
    print("=" * 60)
    print("🌐 Server starting on http://localhost:8000")
    print("📚 API Documentation: http://localhost:8000/docs")
    print("📖 ReDoc Documentation: http://localhost:8000/redoc")
    print("❤️  Health Check: http://localhost:8000/health")
    print("📊 Statistics: http://localhost:8000/api/waitlist/stats")
    print("=" * 60)
    print("💡 Press Ctrl+C to stop the server")
    print()
    
    # Change to the scripts directory to run the API
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)
    
    # Run the API
    try:
        subprocess.run([sys.executable, "waitlist_api.py"])
    except KeyboardInterrupt:
        print("\n👋 Server stopped by user")
    except Exception as e:
        print(f"\n❌ Error running server: {e}")

if __name__ == "__main__":
    try:
        if install_requirements():
            start_server()
        else:
            print("❌ Failed to install required packages. Please check your Python environment.")
    except KeyboardInterrupt:
        print("\n👋 Setup cancelled by user")
    except Exception as e:
        print(f"❌ Error during setup: {e}")
