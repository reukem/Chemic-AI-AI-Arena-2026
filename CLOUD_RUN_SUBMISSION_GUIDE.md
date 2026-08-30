# 🚀 Chemic-AI: Google Cloud Run Deployment & AI Riser Submission Guide

This guide details how to deploy Chemic-AI live to **Google Cloud Run** to secure the **+10 Deployment Bonus Points** and submit before the August 30 deadline.

---

## ☁️ Step 1: Deploy to Google Cloud Run (1-Click)

### Method A: Using the Automated Script (Windows)
1. Open your terminal in the project directory.
2. Run:
   ```cmd
   deploy-cloud-run.bat
   ```
3. When prompted, select your Google Cloud project (or let it create one with free credits).
4. Within 2–3 minutes, Google Cloud Run will output your live public URL:
   ```
   Service URL: https://chemic-ai-xxxxxx-as.a.run.app
   ```

### Method B: Single `gcloud` CLI Command
```bash
gcloud run deploy chemic-ai \
  --source . \
  --region asia-southeast1 \
  --allow-unauthenticated \
  --port 8080
```

---

## 🏆 Step 2: AI Riser Vietnam Submission Form Checklist

When filling out the completion form at **[goo.gle/airiservietnam](https://goo.gle/airiservietnam)**:

| Field | Content to Provide | Points Awarded |
| :--- | :--- | :---: |
| **Category** | `7. Education (Giáo dục)` | Up to 100 pts |
| **App Link** | Your Google AI Studio share link / Cloud Run link | Required |
| **Live Cloud Run URL** | `https://chemic-ai-xxxxxx-as.a.run.app` | **+10 Bonus Points** |
| **Google Tech Integration** | `Gemini 2.5 Flash (Multimodal Vision & Socratic Reasoning), Google Workspace Docs Export, Google Cloud Run` | **+10 Bonus Points** |
| **Demo Video (YouTube)** | Max 2-minute public YouTube walkthrough link | Required |
| **LinkedIn Post** | Public post with `#AIRiserVietnam` and `#BuildwithGoogleAI` | Required |
| **Early Submission** | Submit before August 30, 2026 | **+3 Bonus Points** |

---

## 🎥 Step 3: 2-Minute YouTube Demo Video Script

* **0:00 - 0:25 (The Problem & Vision)**:
  * *"In Vietnam, millions of students in rural schools lack access to physical chemistry laboratories and chemical reagents. Chemic-AI bridges this gap by turning any budget device into a quantum reality chemistry lab."*
* **0:25 - 0:55 (Gemini Multimodal Vision & GDPT 2018 Quests)**:
  * Show the 📸 **Gemini Vision Homework Scanner**: Snap a photo of a textbook equation $\to$ Gemini solves it and automatically loads the beakers on the workbench!
  * Show the 🇻🇳 **Vietnam National Exam Practical Quests**: Demonstrate solving the Saponification or Tollens Silver Mirror reaction.
* **0:55 - 1:25 (Virtual Physics & Lucy Socratic AI)**:
  * Demonstrate pouring chemicals, continuous sizzling effervescence, billowing vapor mist, and incandescent sparks.
  * Show Professor Lucy providing pedagogical hints without giving away the answer.
* **1:25 - 1:55 (Google Workspace Export & Competency Radar)**:
  * 1-Click export to **Google Docs** for a formatted lab report.
  * Show the **Student Competency Radar** & verifiable completion certificate.
* **1:55 - 2:00 (Call to Action)**:
  * *"Built with Gemini 2.5 on Google Cloud Run for #AIRiserVietnam 2026. Empowering every Vietnamese student to master chemistry."*

---

## 📱 Step 4: LinkedIn Post Template

```markdown
🚀 Excited to introduce Chemic-AI: Democratizing Chemistry Education for Vietnamese Students with Google AI! 🧪🇻🇳

Did you know that over 65% of secondary schools in rural Vietnam lack fully-equipped chemistry laboratories? 

To solve this for #AIRiserVietnam 2026, we built Chemic-AI (#BuildwithGoogleAI):
✨ Interactive 2D/WebGL Virtual Chemistry Laboratory simulating 40+ reagents, thermodynamics, and authentic reaction physics.
📸 Gemini 2.5 Flash Multimodal Vision: Snap a photo of any handwritten homework or exam question to instantly solve and load the apparatus onto your virtual bench.
🇻🇳 Vietnam GDPT 2018 National Exam Quests: 5 signature practical experiments with Socratic AI guidance from Professor Lucy.
📄 1-Click Google Workspace Export: Generates academic lab reports directly into Google Docs.
☁️ Deployed serverless on Google Cloud Run for ultra-fast, low-bandwidth access across Vietnam.

Check out the live demo here: [YOUR_CLOUD_RUN_LINK]
Watch the 2-minute walkthrough: [YOUR_YOUTUBE_LINK]

#AIRiserVietnam #BuildwithGoogleAI #GoogleAIStudio #Gemini #CloudRun #EdTech #Vietnam
```
