# 🌾 Suraksha - Agricultural Security Platform

A robust agricultural security and advisory platform built to protect farmers and ensure sustainable farming practices.

## 🎯 Overview

Suraksha is a comprehensive platform focused on:
- 🛡️ Protecting farmer interests
- 📊 Providing market information
- 🌾 Sustainable farming practices
- 💡 Expert agricultural advice
- 👥 Farmer community building

## ✨ Key Features

- 📱 **Mobile Responsive** - Works on all devices
- 🔍 **Price Tracking** - Real-time commodity prices
- 📈 **Market Analytics** - Price trends and predictions
- 🌾 **Crop Advisory** - Expert farming recommendations
- 🛡️ **Farmer Rights** - Legal protection information
- 👥 **Community** - Connect with other farmers
- 📞 **Support** - 24/7 customer support

## 📋 Prerequisites

- Node.js v12+
- npm or yarn
- Modern web browser

## 🚀 Installation

### Step 1: Clone Repository
```bash
git clone https://github.com/Vedanshurathi/suraksha.git
cd suraksha
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configuration
```bash
cp .env.example .env
# Edit .env with your API keys
```

### Step 4: Start Server
```bash
npm start
```

Access at: `http://localhost:3000`

## 💻 Usage

### For End Users
1. Visit the website
2. Select your state and crop
3. View live market prices
4. Read expert advisory
5. Join the farmer community

### For Developers
- Modify code in `public/` folder
- Run `npm run dev` for development mode
- Use `npm run build` for production build

## 🛠️ Technologies

| Technology | Purpose |
|-----------|---------|
| HTML5 | Structure |
| CSS3 | Styling |
| JavaScript | Interactivity |
| Node.js | Backend |
| Express | Web framework |
| MongoDB | Database |

## 📁 Project Structure

```
suraksha/
├── public/
│   ├── index.html
│   ├── css/
│   │   ├── style.css
│   │   └── responsive.css
│   └── js/
│       ├── app.js
│       └── api.js
├── server.js
├── routes/
│   ├── prices.js
│   └── advisory.js
├── .env.example
├── package.json
└── README.md
```

## 🌐 API Reference

### Get Market Prices
```bash
GET /api/prices?state=STATE&crop=CROP
```

### Get Advisory
```bash
GET /api/advisory?crop=CROP&region=REGION
```

## 🚀 Deployment

### On Render
1. Connect GitHub repo to Render
2. Set Build: `npm install`
3. Set Start: `node server.js`
4. Deploy!

### On Heroku
```bash
heroku create suraksha-app
git push heroku main
heroku open
```

## 📊 Screenshots

*Dashboard showing:*
- Market prices
- Weather information
- Advisory feed
- Community section

## 🔐 Security

- Encrypted API communications
- User data protection
- Secure authentication
- Regular security audits

## 🐛 Bug Reports

Found a bug? Open an issue on [GitHub Issues](https://github.com/Vedanshurathi/suraksha/issues)

## 🤝 Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feature/feature-name`
3. Commit: `git commit -m 'Add feature'`
4. Push: `git push origin feature/feature-name`
5. Submit a Pull Request

## 📝 Code of Conduct

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to abide by its terms.

## 📄 License

MIT License - see [LICENSE](LICENSE) for details

## 👤 Author

**Vedanshu Rathi**
- GitHub: [@Vedanshurathi](https://github.com/Vedanshurathi)
- Portfolio: [vedanshurathi.com](https://vedanshurathi.com)

## 🙏 Acknowledgments

- Agricultural experts and advisors
- Farming community for feedback
- Open source contributors
- Government agriculture departments

## 📞 Support

- **Email**: support@suraksha.com
- **Issues**: [GitHub Issues](https://github.com/Vedanshurathi/suraksha/issues)
- **Community**: [Discussion Forum](https://github.com/Vedanshurathi/suraksha/discussions)

## 🗺️ Roadmap

- [ ] Mobile application
- [ ] Multi-language support
- [ ] AI-based recommendations
- [ ] Blockchain integration
- [ ] Direct farmer-to-buyer system
- [ ] Insurance integration
- [ ] Satellite imagery
- [ ] IoT sensor integration

---

**Securing Farmer Futures Through Technology** 🌾❤️
