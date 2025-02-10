git clone https://github.com/mrrCarter/rideoke_new.git
cd rideoke_new
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your Firebase configuration:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Start the development server:
```bash
npm run dev
```

## Pushing to GitHub

To push your changes to the repository:

1. Initialize git and set up your credentials:
```bash
git init
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

2. Add your files and commit:
```bash
git add .
git commit -m "Your commit message"
```

3. Add the remote repository and push:
```bash
git remote add origin https://github.com/mrrCarter/rideoke_new.git
git branch -M main
git push -u origin main
```

Note: You'll need to authenticate with GitHub using either:
- Personal Access Token (recommended)
- SSH key
- GitHub CLI

To generate a Personal Access Token:
1. Go to GitHub Settings > Developer settings > Personal access tokens
2. Generate a new token with 'repo' access
3. Use this token when prompted for password during git push

## Special Offers

- **Student Discount**: 15% off with valid Boston area student ID
- **Refer a Friend**: $10 credit for every friend's first ride
- **#RideokeChallenge**: Join our inter-college competition!
  - Share your Rideoke moments with #RideokeChallenge
  - Compete with other Boston schools
  - Special prizes for most creative performances

## Project Structure

```
client/
├── src/
│   ├── components/    # Reusable UI components
│   ├── pages/        # Page components
│   ├── lib/          # Utilities and configurations
│   └── hooks/        # Custom React hooks
server/
└── mock-data/        # Mock data for development