import { users, type User, type InsertUser, posts, type Post, type InsertPost } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Blog post methods
  getAllPosts(): Promise<Post[]>;
  getPostById(id: number): Promise<Post | undefined>;
  createPost(post: InsertPost): Promise<Post>;
  updatePost(id: number, post: Partial<InsertPost>): Promise<Post | undefined>;
  deletePost(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private blogPosts: Map<number, Post>;
  currentUserId: number;
  currentPostId: number;

  constructor() {
    this.users = new Map();
    this.blogPosts = new Map();
    this.currentUserId = 1;
    this.currentPostId = 1;

    // Add some initial blog posts
    this.createPost({
      title: "Understanding TypeScript: A Practical Guide for React Developers",
      content: "# Understanding TypeScript\n\nTypeScript has become an essential tool for modern React development. In this comprehensive guide, we'll explore how TypeScript can enhance your React applications with strong typing, better autocompletion, and improved maintainability...\n\n## Benefits of TypeScript\n\n- Static type checking\n- Better IDE support\n- Enhanced code documentation\n- Safer refactoring\n\n## Getting Started\n\nTo add TypeScript to your React project, you need to install the following packages:\n\n```bash\nnpm install --save-dev typescript @types/react @types/react-dom\n```\n\nThen, create a `tsconfig.json` file in your project root with the following content:\n\n```json\n{\n  \"compilerOptions\": {\n    \"target\": \"es5\",\n    \"lib\": [\"dom\", \"dom.iterable\", \"esnext\"],\n    \"allowJs\": true,\n    \"skipLibCheck\": true,\n    \"esModuleInterop\": true,\n    \"allowSyntheticDefaultImports\": true,\n    \"strict\": true,\n    \"forceConsistentCasingInFileNames\": true,\n    \"noFallthroughCasesInSwitch\": true,\n    \"module\": \"esnext\",\n    \"moduleResolution\": \"node\",\n    \"resolveJsonModule\": true,\n    \"isolatedModules\": true,\n    \"noEmit\": true,\n    \"jsx\": \"react-jsx\"\n  },\n  \"include\": [\"src\"]\n}\n```\n\n## Type Annotations in React\n\nHere's how you can add types to your React components:\n\n```tsx\ntype ButtonProps = {\n  text: string;\n  onClick?: () => void;\n  variant?: 'primary' | 'secondary';\n};\n\nconst Button = ({ text, onClick, variant = 'primary' }: ButtonProps) => {\n  return (\n    <button \n      className={`btn btn-${variant}`} \n      onClick={onClick}\n    >\n      {text}\n    </button>\n  );\n};\n```\n\n## Conclusion\n\nTypeScript provides significant advantages when working with React applications, especially as they grow in size and complexity. The initial investment in learning and setting up TypeScript pays off with more robust code, fewer runtime errors, and a better development experience.",
      summary: "TypeScript has become an essential tool for modern React development. In this comprehensive guide, we'll explore how TypeScript can enhance your React applications with strong typing, better autocompletion, and improved maintainability...",
      author: "Sarah Chen",
      category: "Technology",
      readTime: "5 min read",
      imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    });

    this.createPost({
      title: "Building Responsive UIs with Tailwind CSS",
      content: "# Building Responsive UIs with Tailwind CSS\n\nTailwind CSS is a utility-first CSS framework that allows you to build modern, responsive user interfaces without leaving your HTML. Unlike traditional CSS frameworks that provide pre-designed components, Tailwind gives you low-level utility classes that let you build completely custom designs.\n\n## Why Choose Tailwind CSS?\n\n- No more naming CSS classes\n- Faster development process\n- Consistent design system\n- Highly customizable\n- Optimized production builds\n\n## Getting Started\n\nTo add Tailwind CSS to your project, follow these steps:\n\n```bash\nnpm install -D tailwindcss postcss autoprefixer\nnpx tailwindcss init -p\n```\n\nConfigure your template paths in `tailwind.config.js`:\n\n```js\nmodule.exports = {\n  content: [\n    \"./src/**/*.{js,jsx,ts,tsx}\",\n  ],\n  theme: {\n    extend: {},\n  },\n  plugins: [],\n}\n```\n\nAdd the Tailwind directives to your CSS file:\n\n```css\n@tailwind base;\n@tailwind components;\n@tailwind utilities;\n```\n\n## Building a Responsive Layout\n\nTailwind makes building responsive layouts straightforward with its mobile-first breakpoints:\n\n```html\n<div class=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4\">\n  <div class=\"bg-white p-4 rounded shadow\">Card 1</div>\n  <div class=\"bg-white p-4 rounded shadow\">Card 2</div>\n  <div class=\"bg-white p-4 rounded shadow\">Card 3</div>\n</div>\n```\n\nThis creates a grid that displays:\n- 1 column on mobile\n- 2 columns on medium screens (md)\n- 3 columns on large screens (lg)\n\n## Creating Custom Components\n\nWhile Tailwind is utility-first, you can extract common patterns into reusable components:\n\n```jsx\nfunction Button({ children, primary }) {\n  return (\n    <button\n      className={`px-4 py-2 rounded font-semibold ${primary\n        ? 'bg-blue-500 text-white hover:bg-blue-600'\n        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}\n    >\n      {children}\n    </button>\n  );\n}\n```\n\n## Conclusion\n\nTailwind CSS provides a different approach to styling your applications. Its utility-first methodology might seem verbose at first, but the productivity gains, consistency, and maintainability it offers make it a powerful choice for modern web development.",
      summary: "Learn how to create beautiful, responsive user interfaces using Tailwind CSS. This utility-first CSS framework allows you to build modern designs without leaving your HTML...",
      author: "Michael Roberts",
      category: "React",
      readTime: "3 min read",
      imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    });

    this.createPost({
      title: "Optimizing React Applications for Speed",
      content: "# Optimizing React Applications for Speed\n\nPerformance is a critical aspect of user experience in web applications. A slow application can lead to frustrated users and lost engagement. In this article, we'll explore practical techniques to optimize your React applications for speed.\n\n## Common Performance Issues in React\n\nBefore diving into solutions, let's identify some common causes of performance problems in React applications:\n\n- Unnecessary re-renders of components\n- Large bundle sizes\n- Inefficient state management\n- Expensive calculations being repeated\n- Unoptimized images and assets\n\n## 1. Prevent Unnecessary Re-renders\n\nReact's rendering mechanism is powerful but can lead to performance issues if components re-render unnecessarily. Use these techniques to prevent wasted renders:\n\n### Use React.memo for Component Memoization\n\nWrap function components with `React.memo()` to prevent re-rendering when props haven't changed:\n\n```jsx\nconst MyComponent = React.memo(function MyComponent(props) {\n  // Your component logic\n});\n```\n\n### Use useCallback for Event Handlers\n\nMemoize callback functions with `useCallback` to maintain referential equality between renders:\n\n```jsx\nconst handleClick = useCallback(() => {\n  // Event handling logic\n}, [/* dependencies */]);\n```\n\n### Use useMemo for Expensive Calculations\n\nCache the results of expensive calculations with `useMemo`:\n\n```jsx\nconst expensiveResult = useMemo(() => {\n  return performExpensiveCalculation(a, b);\n}, [a, b]);\n```\n\n## 2. Implement Code Splitting\n\nLarge bundle sizes can significantly increase initial load times. Code splitting allows you to break your code into smaller chunks that load on demand:\n\n### Use React.lazy and Suspense\n\n```jsx\nconst LazyComponent = React.lazy(() => import('./LazyComponent'));\n\nfunction MyComponent() {\n  return (\n    <React.Suspense fallback={<div>Loading...</div>}>\n      <LazyComponent />\n    </React.Suspense>\n  );\n}\n```\n\n## 3. Optimize Images and Assets\n\nImages often account for the majority of downloaded bytes on a webpage. Optimize them by:\n\n- Using appropriate image formats (WebP where supported)\n- Implementing responsive images\n- Lazy loading images that are not in the initial viewport\n\n## 4. Use Production Builds\n\nAlways use production builds for deployment. React includes many helpful warnings in development mode that are stripped out in production, making the code significantly smaller and faster.\n\n## Conclusion\n\nPerformance optimization is an ongoing process rather than a one-time task. By implementing these techniques and regularly measuring your application's performance, you can ensure your React application provides a smooth, responsive experience for your users.\n\n> \"Premature optimization is the root of all evil.\" - Donald Knuth\n>\n> Always measure first to identify actual performance bottlenecks rather than optimizing blindly.",
      summary: "Performance matters in web applications. Discover practical techniques to improve your React app's performance through code splitting, memoization, and proper state management...",
      author: "Emily Johnson",
      category: "Performance",
      readTime: "4 min read",
      imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    });

    this.createPost({
      title: "Animation Fundamentals with Framer Motion",
      content: "# Animation Fundamentals with Framer Motion\n\nFramer Motion is a powerful animation library for React that makes creating smooth, interactive animations surprisingly easy. In this guide, we'll explore the core concepts and practical examples to help you add delightful animations to your React applications.\n\n## Getting Started\n\nFirst, install Framer Motion in your React project:\n\n```bash\nnpm install framer-motion\n# or\nyarn add framer-motion\n```\n\n## Basic Animations\n\nThe core of Framer Motion is the `motion` component. It extends HTML and SVG elements with animation capabilities:\n\n```jsx\nimport { motion } from 'framer-motion';\n\nfunction AnimatedBox() {\n  return (\n    <motion.div\n      initial={{ opacity: 0, scale: 0.8 }}\n      animate={{ opacity: 1, scale: 1 }}\n      transition={{ duration: 0.5 }}\n      className=\"w-32 h-32 bg-blue-500\"\n    />\n  );\n}\n```\n\n## Gesture Animations\n\nFramer Motion makes it easy to add animations triggered by user interactions:\n\n```jsx\n<motion.button\n  whileHover={{ scale: 1.1 }}\n  whileTap={{ scale: 0.95 }}\n  className=\"px-4 py-2 bg-purple-600 text-white rounded\"\n>\n  Click me\n</motion.button>\n```\n\n## Page Transitions\n\nFor smooth page transitions in a React application, you can use the `AnimatePresence` component:\n\n```jsx\nimport { AnimatePresence, motion } from 'framer-motion';\n\nfunction PageTransition({ children, location }) {\n  return (\n    <AnimatePresence mode=\"wait\">\n      <motion.div\n        key={location.pathname}\n        initial={{ opacity: 0, y: 20 }}\n        animate={{ opacity: 1, y: 0 }}\n        exit={{ opacity: 0, y: -20 }}\n        transition={{ duration: 0.3 }}\n      >\n        {children}\n      </motion.div>\n    </AnimatePresence>\n  );\n}\n```\n\n## Variants for Complex Animations\n\nVariants allow you to define animation states that can be reused and orchestrated:\n\n```jsx\nconst containerVariants = {\n  hidden: { opacity: 0 },\n  visible: {\n    opacity: 1,\n    transition: {\n      staggerChildren: 0.1\n    }\n  }\n};\n\nconst itemVariants = {\n  hidden: { y: 20, opacity: 0 },\n  visible: { y: 0, opacity: 1 }\n};\n\nfunction List() {\n  return (\n    <motion.ul\n      variants={containerVariants}\n      initial=\"hidden\"\n      animate=\"visible\"\n    >\n      {items.map(item => (\n        <motion.li key={item.id} variants={itemVariants}>\n          {item.text}\n        </motion.li>\n      ))}\n    </motion.ul>\n  );\n}\n```\n\n## Scroll-Based Animations\n\nYou can trigger animations based on scroll position:\n\n```jsx\nimport { motion, useScroll } from 'framer-motion';\n\nfunction ScrollProgress() {\n  const { scrollYProgress } = useScroll();\n  \n  return (\n    <motion.div\n      className=\"fixed top-0 left-0 right-0 h-1 bg-red-500 origin-left\"\n      style={{ scaleX: scrollYProgress }}\n    />\n  );\n}\n```\n\n## Conclusion\n\nFramer Motion provides an intuitive API for creating professional animations in React applications. By starting with these fundamentals and exploring the extensive documentation, you can add engaging motion to your user interfaces that enhance the user experience without overwhelming development time.",
      summary: "Add life to your React components with Framer Motion. This powerful animation library makes it easy to create smooth transitions and interactive UIs that delight users...",
      author: "David Kim",
      category: "UI/UX",
      readTime: "6 min read",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    });

    this.createPost({
      title: "State Management Patterns in React Applications",
      content: "# State Management Patterns in React Applications\n\nState management is a critical aspect of building scalable React applications. As your application grows, managing state becomes increasingly complex. In this article, we'll explore different state management patterns in React and when to use each one.\n\n## Local Component State\n\nReact's built-in `useState` hook is perfect for managing local component state:\n\n```jsx\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  \n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>Increment</button>\n    </div>\n  );\n}\n```\n\n**Best for**: Simple components with self-contained state that doesn't need to be shared.\n\n## Lifting State Up\n\nWhen multiple components need to share state, you can lift the state to their closest common ancestor:\n\n```jsx\nfunction Parent() {\n  const [count, setCount] = useState(0);\n  \n  return (\n    <div>\n      <CountDisplay count={count} />\n      <CountControls onIncrement={() => setCount(count + 1)} />\n    </div>\n  );\n}\n```\n\n**Best for**: Sharing state between a few closely related components.\n\n## Context API\n\nFor state that needs to be accessed by many components at different nesting levels, React's Context API provides a way to share values without explicitly passing props:\n\n```jsx\nconst ThemeContext = createContext('light');\n\nfunction App() {\n  const [theme, setTheme] = useState('light');\n  \n  return (\n    <ThemeContext.Provider value={{ theme, setTheme }}>\n      <Header />\n      <MainContent />\n      <Footer />\n    </ThemeContext.Provider>\n  );\n}\n\nfunction ThemedButton() {\n  const { theme, setTheme } = useContext(ThemeContext);\n  \n  return (\n    <button \n      className={`btn-${theme}`}\n      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}\n    >\n      Toggle Theme\n    </button>\n  );\n}\n```\n\n**Best for**: Global state like themes, user authentication, or preferences.\n\n## useReducer for Complex State Logic\n\nWhen state involves complex logic or multiple sub-values, `useReducer` provides a more structured approach:\n\n```jsx\nfunction todoReducer(state, action) {\n  switch (action.type) {\n    case 'ADD_TODO':\n      return [...state, { id: Date.now(), text: action.text, completed: false }];\n    case 'TOGGLE_TODO':\n      return state.map(todo => \n        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo\n      );\n    default:\n      return state;\n  }\n}\n\nfunction TodoList() {\n  const [todos, dispatch] = useReducer(todoReducer, []);\n  \n  const addTodo = text => {\n    dispatch({ type: 'ADD_TODO', text });\n  };\n  \n  // Component logic\n}\n```\n\n**Best for**: Complex state logic that involves multiple sub-values or when the next state depends on the previous one.\n\n## External State Management Libraries\n\nFor large applications with complex state requirements, external libraries provide more robust solutions:\n\n### Redux\n\nRedux offers a predictable state container with a unidirectional data flow:\n\n```jsx\n// Store setup\nconst store = createStore(rootReducer);\n\n// Component\nfunction ConnectedCounter({ count, increment }) {\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={increment}>Increment</button>\n    </div>\n  );\n}\n\n// Connect component to Redux\nconst mapStateToProps = state => ({\n  count: state.counter.value\n});\n\nconst mapDispatchToProps = dispatch => ({\n  increment: () => dispatch({ type: 'INCREMENT' })\n});\n\nexport default connect(mapStateToProps, mapDispatchToProps)(ConnectedCounter);\n```\n\n### Zustand\n\nZustand is a minimalistic state management solution with hooks:\n\n```jsx\nimport create from 'zustand';\n\nconst useStore = create(set => ({\n  count: 0,\n  increment: () => set(state => ({ count: state.count + 1 })),\n}));\n\nfunction Counter() {\n  const { count, increment } = useStore();\n  \n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={increment}>Increment</button>\n    </div>\n  );\n}\n```\n\n## Choosing the Right Approach\n\nWhen deciding on a state management approach, consider:\n\n1. **Scope**: How widely is the state used across your application?\n2. **Complexity**: How complex is the state logic?\n3. **Team size**: Larger teams might benefit from more structured approaches\n4. **Performance**: Some patterns are more performant for specific use cases\n\n## Conclusion\n\nThere's no one-size-fits-all solution for state management in React. Start with the simplest approach that meets your needs, and be ready to evolve your state management strategy as your application grows. Often, a combination of these patterns works best, using local state where possible and more complex solutions only where needed.",
      summary: "Choosing the right state management approach is crucial for scalable React applications. Compare different patterns from React Context and useReducer to external libraries...",
      author: "Alex Turner",
      category: "Architecture",
      readTime: "7 min read",
      imageUrl: "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3",
    });

    this.createPost({
      title: "Rendering Markdown in React Applications",
      content: "# Rendering Markdown in React Applications\n\nMarkdown has become an extremely popular format for writing content due to its simplicity and readability. For React applications, rendering Markdown content can provide a powerful way to display rich, formatted text while maintaining separation between content and presentation. In this guide, we'll explore how to render Markdown in React using the `react-markdown` library.\n\n## Getting Started with react-markdown\n\nFirst, install the necessary packages:\n\n```bash\nnpm install react-markdown remark-gfm\n# or\nyarn add react-markdown remark-gfm\n```\n\nHere, `remark-gfm` adds support for GitHub Flavored Markdown, which includes tables, strikethrough, task lists, and more.\n\n## Basic Usage\n\nHere's a simple example of how to use react-markdown:\n\n```jsx\nimport React from 'react';\nimport ReactMarkdown from 'react-markdown';\nimport remarkGfm from 'remark-gfm';\n\nfunction MarkdownRenderer({ content }) {\n  return (\n    <ReactMarkdown remarkPlugins={[remarkGfm]}>\n      {content}\n    </ReactMarkdown>\n  );\n}\n\n// Example usage\nfunction BlogPost() {\n  const markdownContent = `\n# Hello, *world*!\n\nBelow is a list:\n\n- Item one\n- Item two\n- Item three\n\n[Visit my website](https://example.com)\n  `;\n\n  return (\n    <div className=\"blog-post\">\n      <MarkdownRenderer content={markdownContent} />\n    </div>\n  );\n}\n```\n\n## Styling Markdown Content\n\nBy default, react-markdown outputs unstyled HTML elements. You can apply styling in several ways:\n\n### Using CSS/SCSS\n\n```css\n/* markdown-styles.css */\n.markdown h1 {\n  font-size: 2em;\n  margin-bottom: 0.5em;\n}\n\n.markdown h2 {\n  font-size: 1.5em;\n  margin-bottom: 0.5em;\n}\n\n.markdown p {\n  margin-bottom: 1em;\n  line-height: 1.6;\n}\n\n.markdown a {\n  color: #0077cc;\n  text-decoration: none;\n}\n\n.markdown a:hover {\n  text-decoration: underline;\n}\n\n.markdown ul, .markdown ol {\n  margin-bottom: 1em;\n  padding-left: 2em;\n}\n\n.markdown code {\n  background-color: #f4f4f4;\n  padding: 0.2em 0.4em;\n  border-radius: 3px;\n  font-family: monospace;\n}\n\n.markdown pre {\n  background-color: #f4f4f4;\n  padding: 1em;\n  border-radius: 5px;\n  overflow-x: auto;\n  margin-bottom: 1em;\n}\n```\n\nThen apply it to your component:\n\n```jsx\nimport './markdown-styles.css';\n\nfunction MarkdownRenderer({ content }) {\n  return (\n    <div className=\"markdown\">\n      <ReactMarkdown remarkPlugins={[remarkGfm]}>\n        {content}\n      </ReactMarkdown>\n    </div>\n  );\n}\n```\n\n### Using Tailwind CSS\n\nIf you're using Tailwind CSS, you can use the `@tailwindcss/typography` plugin to style your markdown content easily:\n\n```jsx\n<article className=\"prose dark:prose-invert max-w-none\">\n  <ReactMarkdown remarkPlugins={[remarkGfm]}>\n    {content}\n  </ReactMarkdown>\n</article>\n```\n\n## Syntax Highlighting for Code Blocks\n\nTo add syntax highlighting to code blocks, you can use `react-syntax-highlighter`:\n\n```bash\nnpm install react-syntax-highlighter\n# or\nyarn add react-syntax-highlighter\n```\n\nImplementing it with react-markdown:\n\n```jsx\nimport { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';\nimport { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';\n\nfunction MarkdownRenderer({ content }) {\n  return (\n    <ReactMarkdown\n      remarkPlugins={[remarkGfm]}\n      components={{\n        code({ node, inline, className, children, ...props }) {\n          const match = /language-(\\w+)/.exec(className || '');\n          return !inline && match ? (\n            <SyntaxHighlighter\n              style={atomDark}\n              language={match[1]}\n              PreTag=\"div\"\n              {...props}\n            >\n              {String(children).replace(/\\n$/, '')}\n            </SyntaxHighlighter>\n          ) : (\n            <code className={className} {...props}>\n              {children}\n            </code>\n          );\n        }\n      }}\n    >\n      {content}\n    </ReactMarkdown>\n  );\n}\n```\n\n## Customizing HTML Elements\n\nOne of the powerful features of react-markdown is the ability to customize how each HTML element is rendered. This allows you to integrate with UI libraries or add custom functionality:\n\n```jsx\nfunction MarkdownRenderer({ content }) {\n  return (\n    <ReactMarkdown\n      remarkPlugins={[remarkGfm]}\n      components={{\n        h1: ({ node, ...props }) => <h1 className=\"text-2xl font-bold my-4\" {...props} />,\n        h2: ({ node, ...props }) => <h2 className=\"text-xl font-bold my-3\" {...props} />,\n        a: ({ node, ...props }) => <a className=\"text-blue-500 hover:underline\" {...props} />,\n        img: ({ node, ...props }) => <img className=\"max-w-full rounded my-4\" {...props} />,\n        // Add more custom renderers as needed\n      }}\n    >\n      {content}\n    </ReactMarkdown>\n  );\n}\n```\n\n## Handling Images\n\nWhen working with Markdown that includes images, you might want to add lazy loading or responsive behavior:\n\n```jsx\ncomponents={{\n  img: ({ node, ...props }) => (\n    <img\n      loading=\"lazy\"\n      className=\"max-w-full h-auto rounded-lg\"\n      {...props}\n      onError={(e) => {\n        e.target.src = '/path/to/fallback-image.jpg'; // Fallback image\n      }}\n    />\n  ),\n}}\n```\n\n## Security Considerations\n\nWhen rendering user-generated Markdown content, it's important to consider security. React-markdown sanitizes HTML by default to prevent XSS attacks, but if you need to allow certain HTML elements, you can do so carefully:\n\n```jsx\nimport rehypeRaw from 'rehype-raw';\n\n<ReactMarkdown\n  remarkPlugins={[remarkGfm]}\n  rehypePlugins={[rehypeRaw]} // Enable HTML parsing (use with caution)\n>\n  {content}\n</ReactMarkdown>\n```\n\n## Conclusion\n\nRendering Markdown in React applications provides a flexible way to display rich content while keeping your codebase clean. The `react-markdown` library offers a powerful starting point that can be extended with plugins and customizations to meet your specific needs.\n\nBy separating content from presentation, you can maintain a more maintainable and flexible application, whether you're building a blog, documentation site, or any application that requires formatted text content.",
      summary: "Markdown provides a simple way to format content. Learn how to use react-markdown to render Markdown content in your React applications with syntax highlighting...",
      author: "Jessica Park",
      category: "Markdown",
      readTime: "3 min read",
      imageUrl: "https://images.unsplash.com/photo-1623282033815-40b05d96c903",
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Blog post methods
  async getAllPosts(): Promise<Post[]> {
    return Array.from(this.blogPosts.values()).sort((a, b) => {
      const dateA = new Date(a.createdAt ?? 0);
      const dateB = new Date(b.createdAt ?? 0);
      return dateB.getTime() - dateA.getTime(); // Sort descending by date
    });
  }

  async getPostById(id: number): Promise<Post | undefined> {
    return this.blogPosts.get(id);
  }

  async createPost(post: InsertPost): Promise<Post> {
    const id = this.currentPostId++;
    const now = new Date();
    
    const newPost: Post = {
      ...post,
      id,
      createdAt: now,
      updatedAt: now,
    };
    
    this.blogPosts.set(id, newPost);
    return newPost;
  }

  async updatePost(id: number, updates: Partial<InsertPost>): Promise<Post | undefined> {
    const post = this.blogPosts.get(id);
    if (!post) return undefined;

    const updatedPost: Post = {
      ...post,
      ...updates,
      id, // Ensure we keep the original ID
      updatedAt: new Date(),
    };

    this.blogPosts.set(id, updatedPost);
    return updatedPost;
  }

  async deletePost(id: number): Promise<boolean> {
    return this.blogPosts.delete(id);
  }
}

export const storage = new MemStorage();
