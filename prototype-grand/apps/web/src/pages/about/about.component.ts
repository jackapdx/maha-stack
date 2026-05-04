import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <div class="py-8">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold text-gray-900 mb-8">About prototype-grand</h1>
        
        <div class="prose prose-lg">
          <p class="text-lg text-gray-600 mb-6">
            This application is built with the <strong>Maha-Grand Stack</strong>, a comprehensive
            enterprise-grade solution for building modern web applications with Angular 21
            and NestJS.
          </p>

          <div class="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
            <p class="text-blue-800">
              <strong>Architected by:</strong> Architect
            </p>
          </div>

          <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Technology Stack</h2>
          
          <div class="grid md:grid-cols-2 gap-6 mb-8">
            <div class="bg-white rounded-lg shadow p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-4">Frontend</h3>
              <ul class="space-y-3">
                <li class="flex items-center">
                  <span class="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">🎯</span>
                  <span>Angular 21 with Signals</span>
                </li>
                <li class="flex items-center">
                  <span class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">⚡</span>
                  <span>Zoneless Architecture</span>
                </li>
                <li class="flex items-center">
                  <span class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">🎨</span>
                  <span>Tailwind CSS (Utility-First)</span>
                </li>
              </ul>
            </div>

            <div class="bg-white rounded-lg shadow p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-4">Backend</h3>
              <ul class="space-y-3">
                <li class="flex items-center">
                  <span class="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">🦄</span>
                  <span>NestJS Framework</span>
                </li>
                <li class="flex items-center">
                  <span class="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">🔗</span>
                  <span>tRPC for Type Safety</span>
                </li>
                <li class="flex items-center">
                  <span class="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mr-3">🐳</span>
                  <span>Docker Containerization</span>
                </li>
              </ul>
            </div>
          </div>

          <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">Key Features</h2>
          <ul class="space-y-4">
            <li class="flex items-start">
              <span class="text-green-500 mr-3">✓</span>
              <span><strong>End-to-end Type Safety:</strong> Shared types between frontend and backend via tRPC</span>
            </li>
            <li class="flex items-start">
              <span class="text-green-500 mr-3">✓</span>
              <span><strong>Modern Angular 21:</strong> Signals-based reactivity without Zone.js overhead</span>
            </li>
            <li class="flex items-start">
              <span class="text-green-500 mr-3">✓</span>
              <span><strong>Enterprise Architecture:</strong> Modular monorepo with Nx Workspace</span>
            </li>
            <li class="flex items-start">
              <span class="text-green-500 mr-3">✓</span>
              <span><strong>Production Ready:</strong> Docker containers, CI/CD configuration, monitoring</span>
            </li>
            <li class="flex items-start">
              <span class="text-green-500 mr-3">✓</span>
              <span><strong>Comprehensive Testing:</strong> Unit, integration, and end-to-end tests</span>
            </li>
          </ul>

          <div class="bg-gray-50 rounded-lg p-6 mt-8">
            <h3 class="text-lg font-bold text-gray-900 mb-3">Getting Started</h3>
            <p class="text-gray-700 mb-4">
              This project template includes everything you need to build enterprise-grade
              applications. Check the README for detailed instructions on development,
              deployment, and scaling.
            </p>
            <div class="flex space-x-4">
              <a
                href="/dashboard"
                class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Go to Dashboard
              </a>
              <a
                href="/"
                class="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class AboutComponent {}