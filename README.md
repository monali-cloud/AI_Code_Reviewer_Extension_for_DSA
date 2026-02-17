# AI_Code_Reviewer_Extension_for_DSA

## 🧠 Algoryx – DSA Code Reviewer Chrome Extension

Algoryx is a Chrome Extension designed to provide structured feedback on Data Structures & Algorithms (DSA) solutions directly inside coding platforms like LeetCode.

Instead of relying on external AI APIs, Algoryx performs local, pattern-based static code analysis to generate real-time suggestions focused on:

🚀 Optimization improvements

🧹 Cleaner coding approaches

🎯 Interview-oriented feedback

## ✨ Why Algoryx?

Most DSA practice platforms show whether your solution passes or fails.
Algoryx focuses on how you can improve your approach.

It analyzes your code structure and identifies patterns such as:

Multiple or nested loops

Extra data structures usage

Prefix / suffix pattern usage

Missing modularization

Lack of code comments

## 🏗 Architecture Overview

Algoryx is built using Chrome Extension Manifest V3 and follows a multi-layer architecture:

Popup UI → Content Script → Background Service Worker → Review Engine

Components

popup.js – Handles UI and user interaction

content.js – Extracts code from the active coding editor

background.js – Performs pattern-based code analysis

manifest.json – Extension configuration

popup.html – User interface layout

## 🔍 How It Works

User opens a DSA problem on LeetCode

Writes or pastes solution in the editor

Clicks “Review My Solution”

Extension extracts code from the editor

Background service analyzes logic patterns

Structured feedback is displayed in the popup



Structural inefficiencies

All processing happens locally within the extension.
