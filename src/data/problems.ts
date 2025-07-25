import { Problem } from '../types/problem';

export const problems: Problem[] = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    constraints: [
      '2 ≤ nums.length ≤ 10⁴',
      '-10⁹ ≤ nums[i] ≤ 10⁹',
      '-10⁹ ≤ target ≤ 10⁹',
      'Only one valid answer exists.'
    ],
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]'
      },
      {
        input: 'nums = [3,3], target = 6',
        output: '[0,1]'
      }
    ],
    testCases: [
      { input: '[2,7,11,15], 9', expectedOutput: '[0,1]' },
      { input: '[3,2,4], 6', expectedOutput: '[1,2]' },
      { input: '[3,3], 6', expectedOutput: '[0,1]' }
    ],
    tags: ['Array', 'Hash Table'],
    acceptance: 49.1,
    submissions: 15237482,
    hints: [
      'Think about using a hash map to store numbers you\'ve seen',
      'For each number, check if target - number exists in your hash map',
      'Remember to return the indices, not the values'
    ],
    companies: ['Amazon', 'Apple', 'Google']
  },
  {
    id: 'reverse-integer',
    title: 'Reverse Integer',
    difficulty: 'Medium',
    description: `Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2³¹, 2³¹ - 1], then return 0.

Assume the environment does not allow you to store 64-bit integers (signed or unsigned).`,
    constraints: [
      '-2³¹ ≤ x ≤ 2³¹ - 1'
    ],
    examples: [
      {
        input: 'x = 123',
        output: '321'
      },
      {
        input: 'x = -123',
        output: '-321'
      },
      {
        input: 'x = 120',
        output: '21'
      }
    ],
    testCases: [
      { input: '123', expectedOutput: '321' },
      { input: '-123', expectedOutput: '-321' },
      { input: '120', expectedOutput: '21' }
    ],
    tags: ['Math'],
    acceptance: 27.4,
    submissions: 8547392,
    hints: [
      'Build the reversed number digit by digit',
      'Check for integer overflow before and after each operation',
      'Use modulo to get the last digit'
    ],
    companies: ['Bloomberg', 'Amazon', 'Apple']
  },
  {
    id: 'palindrome-number',
    title: 'Palindrome Number',
    difficulty: 'Easy',
    description: `Given an integer x, return true if x is a palindrome, and false otherwise.`,
    constraints: [
      '-2³¹ ≤ x ≤ 2³¹ - 1'
    ],
    examples: [
      {
        input: 'x = 121',
        output: 'true',
        explanation: '121 reads as 121 from left to right and from right to left.'
      },
      {
        input: 'x = -121',
        output: 'false',
        explanation: 'From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.'
      },
      {
        input: 'x = 10',
        output: 'false',
        explanation: 'Reads 01 from right to left. Therefore it is not a palindrome.'
      }
    ],
    testCases: [
      { input: '121', expectedOutput: 'true' },
      { input: '-121', expectedOutput: 'false' },
      { input: '10', expectedOutput: 'false' }
    ],
    tags: ['Math'],
    acceptance: 54.1,
    submissions: 6293847,
    hints: [
      'Negative numbers cannot be palindromes',
      'Compare the number with its reverse',
      'You can reverse only half the number to optimize'
    ],
    companies: ['Payal', 'Amazon', 'Microsoft']
  },
  {
    id: 'longest-common-prefix',
    title: 'Longest Common Prefix',
    difficulty: 'Easy',
    description: `Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string "".`,
    constraints: [
      '1 ≤ strs.length ≤ 200',
      '0 ≤ strs[i].length ≤ 200',
      'strs[i] consists of only lowercase English letters.'
    ],
    examples: [
      {
        input: 'strs = ["flower","flow","flight"]',
        output: '"fl"'
      },
      {
        input: 'strs = ["dog","racecar","car"]',
        output: '""',
        explanation: 'There is no common prefix among the input strings.'
      }
    ],
    testCases: [
      { input: '["flower","flow","flight"]', expectedOutput: '"fl"' },
      { input: '["dog","racecar","car"]', expectedOutput: '""' }
    ],
    tags: ['String', 'Trie'],
    acceptance: 40.8,
    submissions: 4829374,
    hints: [
      'Compare characters vertically across all strings',
      'Stop when you find the first mismatch',
      'Handle edge case when one string is shorter'
    ],
    companies: ['Amazon', 'Microsoft', 'Facebook']
  },
  {
    id: 'merge-two-sorted-lists',
    title: 'Merge Two Sorted Lists',
    difficulty: 'Easy',
    description: `You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.`,
    constraints: [
      'The number of nodes in both lists is in the range [0, 50].',
      '-100 ≤ Node.val ≤ 100',
      'Both list1 and list2 are sorted in non-decreasing order.'
    ],
    examples: [
      {
        input: 'list1 = [1,2,4], list2 = [1,3,4]',
        output: '[1,1,2,3,4,4]'
      },
      {
        input: 'list1 = [], list2 = []',
        output: '[]'
      },
      {
        input: 'list1 = [], list2 = [0]',
        output: '[0]'
      }
    ],
    testCases: [
      { input: '[1,2,4], [1,3,4]', expectedOutput: '[1,1,2,3,4,4]' },
      { input: '[], []', expectedOutput: '[]' },
      { input: '[], [0]', expectedOutput: '[0]' }
    ],
    tags: ['Linked List', 'Recursion'],
    acceptance: 62.8,
    submissions: 4672893,
    hints: [
      'Use a dummy node to simplify edge cases',
      'Compare values and advance the smaller one',
      'Don\'t forget to link the remaining nodes'
    ],
    companies: ['Amazon', 'Microsoft', 'Apple']
  },
  {
    id: 'median-two-sorted-arrays',
    title: 'Median of Two Sorted Arrays',
    difficulty: 'Hard',
    description: `Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).`,
    constraints: [
      'nums1.length == m',
      'nums2.length == n',
      '0 ≤ m ≤ 1000',
      '0 ≤ n ≤ 1000',
      '1 ≤ m + n ≤ 2000',
      '-10⁶ ≤ nums1[i], nums2[i] ≤ 10⁶'
    ],
    examples: [
      {
        input: 'nums1 = [1,3], nums2 = [2]',
        output: '2.00000',
        explanation: 'merged array = [1,2,3] and median is 2.'
      },
      {
        input: 'nums1 = [1,2], nums2 = [3,4]',
        output: '2.50000',
        explanation: 'merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.'
      }
    ],
    testCases: [
      { input: '[1,3], [2]', expectedOutput: '2.00000' },
      { input: '[1,2], [3,4]', expectedOutput: '2.50000' }
    ],
    tags: ['Array', 'Binary Search', 'Divide and Conquer'],
    acceptance: 36.9,
    submissions: 2847392,
    hints: [
      'Use binary search approach',
      'Consider partitioning the arrays',
      'The median is the middle element in a sorted array'
    ],
    solution: 'Optimal solution uses binary search on the smaller array to find the correct partition.',
    timeComplexity: 'O(log(min(m,n)))',
    spaceComplexity: 'O(1)',
    companies: ['Google', 'Facebook', 'Amazon']
  },
  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
- Open brackets must be closed by the same type of brackets.
- Open brackets must be closed in the correct order.
- Every close bracket has a corresponding open bracket of the same type.`,
    constraints: [
      '1 ≤ s.length ≤ 10⁴',
      's consists of parentheses only \'()[]{}\''
    ],
    examples: [
      {
        input: 's = "()"',
        output: 'true'
      },
      {
        input: 's = "()[]{}"',
        output: 'true'
      },
      {
        input: 's = "(]"',
        output: 'false'
      }
    ],
    testCases: [
      { input: '"()"', expectedOutput: 'true' },
      { input: '"()[]{}"', expectedOutput: 'true' },
      { input: '"(]"', expectedOutput: 'false' }
    ],
    tags: ['String', 'Stack'],
    acceptance: 40.6,
    submissions: 3247189,
    hints: [
      'Use a stack data structure',
      'Push opening brackets onto the stack',
      'Pop and match closing brackets with the top of the stack'
    ],
    companies: ['Microsoft', 'Amazon', 'Facebook']
  },
  {
    id: 'maximum-subarray',
    title: 'Maximum Subarray',
    difficulty: 'Medium',
    description: `Given an integer array nums, find the subarray with the largest sum, and return its sum.`,
    constraints: [
      '1 ≤ nums.length ≤ 10⁵',
      '-10⁴ ≤ nums[i] ≤ 10⁴'
    ],
    examples: [
      {
        input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
        output: '6',
        explanation: 'The subarray [4,-1,2,1] has the largest sum 6.'
      },
      {
        input: 'nums = [1]',
        output: '1'
      },
      {
        input: 'nums = [5,4,-1,7,8]',
        output: '23'
      }
    ],
    testCases: [
      { input: '[-2,1,-3,4,-1,2,1,-5,4]', expectedOutput: '6' },
      { input: '[1]', expectedOutput: '1' },
      { input: '[5,4,-1,7,8]', expectedOutput: '23' }
    ],
    tags: ['Array', 'Dynamic Programming', 'Divide and Conquer'],
    acceptance: 53.2,
    submissions: 4829374,
    hints: [
      'Think about Kadane\'s algorithm',
      'Keep track of the maximum sum ending at each position',
      'Update global maximum as you iterate'
    ],
    companies: ['Bloomberg', 'Amazon', 'Microsoft']
  },
  {
    id: 'climbing-stairs',
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    description: `You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?`,
    constraints: [
      '1 ≤ n ≤ 45'
    ],
    examples: [
      {
        input: 'n = 2',
        output: '2',
        explanation: 'There are two ways to climb to the top: 1+1 or 2.'
      },
      {
        input: 'n = 3',
        output: '3',
        explanation: 'There are three ways: 1+1+1, 1+2, or 2+1.'
      }
    ],
    testCases: [
      { input: '2', expectedOutput: '2' },
      { input: '3', expectedOutput: '3' },
      { input: '5', expectedOutput: '8' }
    ],
    tags: ['Math', 'Dynamic Programming', 'Memoization'],
    acceptance: 52.1,
    submissions: 2847392,
    hints: [
      'This is similar to the Fibonacci sequence',
      'f(n) = f(n-1) + f(n-2)',
      'Use dynamic programming to avoid redundant calculations'
    ],
    companies: ['Adobe', 'Apple', 'Amazon']
  },
  {
    id: 'binary-tree-inorder-traversal',
    title: 'Binary Tree Inorder Traversal',
    difficulty: 'Easy',
    description: `Given the root of a binary tree, return the inorder traversal of its nodes' values.`,
    constraints: [
      'The number of nodes in the tree is in the range [0, 100]',
      '-100 ≤ Node.val ≤ 100'
    ],
    examples: [
      {
        input: 'root = [1,null,2,3]',
        output: '[1,3,2]'
      },
      {
        input: 'root = []',
        output: '[]'
      },
      {
        input: 'root = [1]',
        output: '[1]'
      }
    ],
    testCases: [
      { input: '[1,null,2,3]', expectedOutput: '[1,3,2]' },
      { input: '[]', expectedOutput: '[]' },
      { input: '[1]', expectedOutput: '[1]' }
    ],
    tags: ['Stack', 'Tree', 'Depth-First Search', 'Binary Tree'],
    acceptance: 75.6,
    submissions: 1847392,
    hints: [
      'Inorder traversal: left, root, right',
      'Can be solved recursively or iteratively with a stack',
      'Try both approaches for practice'
    ],
    companies: ['Microsoft', 'Amazon', 'Facebook']
  },
  {
    id: 'same-tree',
    title: 'Same Tree',
    difficulty: 'Easy',
    description: `Given the roots of two binary trees p and q, write a function to check if they are the same or not.

Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.`,
    constraints: [
      'The number of nodes in both trees is in the range [0, 100]',
      '-10⁴ ≤ Node.val ≤ 10⁴'
    ],
    examples: [
      {
        input: 'p = [1,2,3], q = [1,2,3]',
        output: 'true'
      },
      {
        input: 'p = [1,2], q = [1,null,2]',
        output: 'false'
      },
      {
        input: 'p = [1,2,1], q = [1,1,2]',
        output: 'false'
      }
    ],
    testCases: [
      { input: '[1,2,3], [1,2,3]', expectedOutput: 'true' },
      { input: '[1,2], [1,null,2]', expectedOutput: 'false' },
      { input: '[1,2,1], [1,1,2]', expectedOutput: 'false' }
    ],
    tags: ['Tree', 'Depth-First Search', 'Binary Tree'],
    acceptance: 57.8,
    submissions: 1647392,
    hints: [
      'Compare nodes recursively',
      'Check if both nodes are null',
      'Check if values are equal and recurse on subtrees'
    ],
    companies: ['Bloomberg', 'Microsoft', 'Apple']
  },
  {
    id: 'best-time-to-buy-and-sell-stock',
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    description: `You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.`,
    constraints: [
      '1 ≤ prices.length ≤ 10⁵',
      '0 ≤ prices[i] ≤ 10⁴'
    ],
    examples: [
      {
        input: 'prices = [7,1,5,3,6,4]',
        output: '5',
        explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.'
      },
      {
        input: 'prices = [7,6,4,3,1]',
        output: '0',
        explanation: 'In this case, no transactions are done and the max profit = 0.'
      }
    ],
    testCases: [
      { input: '[7,1,5,3,6,4]', expectedOutput: '5' },
      { input: '[7,6,4,3,1]', expectedOutput: '0' },
      { input: '[1,2,3,4,5]', expectedOutput: '4' }
    ],
    tags: ['Array', 'Dynamic Programming'],
    acceptance: 54.7,
    submissions: 5847392,
    hints: [
      'Keep track of the minimum price seen so far',
      'Calculate profit at each day',
      'Update maximum profit as you go'
    ],
    companies: ['Facebook', 'Amazon', 'Microsoft']
  },
  {
    id: 'symmetric-tree',
    title: 'Symmetric Tree',
    difficulty: 'Easy',
    description: `Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).`,
    constraints: [
      'The number of nodes in the tree is in the range [1, 1000]',
      '-100 ≤ Node.val ≤ 100'
    ],
    examples: [
      {
        input: 'root = [1,2,2,3,4,4,3]',
        output: 'true'
      },
      {
        input: 'root = [1,2,2,null,3,null,3]',
        output: 'false'
      }
    ],
    testCases: [
      { input: '[1,2,2,3,4,4,3]', expectedOutput: 'true' },
      { input: '[1,2,2,null,3,null,3]', expectedOutput: 'false' },
      { input: '[1]', expectedOutput: 'true' }
    ],
    tags: ['Tree', 'Depth-First Search', 'Breadth-First Search', 'Binary Tree'],
    acceptance: 54.1,
    submissions: 2647392,
    hints: [
      'Compare the left and right subtrees',
      'A tree is symmetric if left.left equals right.right and left.right equals right.left',
      'Can be solved recursively or iteratively'
    ],
    companies: ['LinkedIn', 'Microsoft', 'Amazon']
  },
  {
    id: 'maximum-depth-of-binary-tree',
    title: 'Maximum Depth of Binary Tree',
    difficulty: 'Easy',
    description: `Given the root of a binary tree, return its maximum depth.

A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.`,
    constraints: [
      'The number of nodes in the tree is in the range [0, 10⁴]',
      '-100 ≤ Node.val ≤ 100'
    ],
    examples: [
      {
        input: 'root = [3,9,20,null,null,15,7]',
        output: '3'
      },
      {
        input: 'root = [1,null,2]',
        output: '2'
      }
    ],
    testCases: [
      { input: '[3,9,20,null,null,15,7]', expectedOutput: '3' },
      { input: '[1,null,2]', expectedOutput: '2' },
      { input: '[]', expectedOutput: '0' }
    ],
    tags: ['Tree', 'Depth-First Search', 'Breadth-First Search', 'Binary Tree'],
    acceptance: 74.9,
    submissions: 4847392,
    hints: [
      'Use recursion to find depth of left and right subtrees',
      'Return 1 + max(left_depth, right_depth)',
      'Base case: null node has depth 0'
    ],
    companies: ['Uber', 'Facebook', 'Google']
  },
  {
    id: 'convert-sorted-array-to-binary-search-tree',
    title: 'Convert Sorted Array to Binary Search Tree',
    difficulty: 'Easy',
    description: `Given an integer array nums where the elements are sorted in ascending order, convert it to a height-balanced binary search tree.`,
    constraints: [
      '1 ≤ nums.length ≤ 10⁴',
      '-10⁴ ≤ nums[i] ≤ 10⁴',
      'nums is sorted in a strictly increasing order'
    ],
    examples: [
      {
        input: 'nums = [-10,-3,0,5,9]',
        output: '[0,-3,9,-10,null,5]',
        explanation: 'One possible answer is [0,-3,9,-10,null,5], which represents a height-balanced BST.'
      },
      {
        input: 'nums = [1,3]',
        output: '[3,1]',
        explanation: '[1,null,3] and [3,1] are both height-balanced BSTs.'
      }
    ],
    testCases: [
      { input: '[-10,-3,0,5,9]', expectedOutput: '[0,-3,9,-10,null,5]' },
      { input: '[1,3]', expectedOutput: '[3,1]' },
      { input: '[1]', expectedOutput: '[1]' }
    ],
    tags: ['Array', 'Divide and Conquer', 'Tree', 'Binary Search Tree', 'Binary Tree'],
    acceptance: 68.4,
    submissions: 1847392,
    hints: [
      'Choose the middle element as the root',
      'Recursively build left and right subtrees',
      'This ensures the tree is height-balanced'
    ],
    companies: ['Airbnb', 'Amazon', 'Apple']
  },
  {
    id: 'path-sum',
    title: 'Path Sum',
    difficulty: 'Easy',
    description: `Given the root of a binary tree and an integer targetSum, return true if the tree has a root-to-leaf path such that adding up all the values along the path equals targetSum.

A leaf is a node with no children.`,
    constraints: [
      'The number of nodes in the tree is in the range [0, 5000]',
      '-1000 ≤ Node.val ≤ 1000',
      '-1000 ≤ targetSum ≤ 1000'
    ],
    examples: [
      {
        input: 'root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22',
        output: 'true',
        explanation: 'The root-to-leaf path with target sum is 5->4->11->2.'
      },
      {
        input: 'root = [1,2,3], targetSum = 5',
        output: 'false'
      },
      {
        input: 'root = [], targetSum = 0',
        output: 'false'
      }
    ],
    testCases: [
      { input: '[5,4,8,11,null,13,4,7,2,null,null,null,1], 22', expectedOutput: 'true' },
      { input: '[1,2,3], 5', expectedOutput: 'false' },
      { input: '[], 0', expectedOutput: 'false' }
    ],
    tags: ['Tree', 'Depth-First Search', 'Binary Tree'],
    acceptance: 47.3,
    submissions: 2147392,
    hints: [
      'Use DFS to traverse all root-to-leaf paths',
      'Keep track of the current sum as you traverse',
      'Check if the sum equals target when you reach a leaf'
    ],
    companies: ['Microsoft', 'Amazon', 'Facebook']
  },
  {
    id: 'pascals-triangle',
    title: 'Pascal\'s Triangle',
    difficulty: 'Easy',
    description: `Given an integer numRows, return the first numRows of Pascal's triangle.

In Pascal's triangle, each number is the sum of the two numbers directly above it.`,
    constraints: [
      '1 ≤ numRows ≤ 30'
    ],
    examples: [
      {
        input: 'numRows = 5',
        output: '[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]'
      },
      {
        input: 'numRows = 1',
        output: '[[1]]'
      }
    ],
    testCases: [
      { input: '5', expectedOutput: '[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]' },
      { input: '1', expectedOutput: '[[1]]' },
      { input: '3', expectedOutput: '[[1],[1,1],[1,2,1]]' }
    ],
    tags: ['Array', 'Dynamic Programming'],
    acceptance: 68.9,
    submissions: 1547392,
    hints: [
      'Each row starts and ends with 1',
      'Middle elements are sum of two elements above',
      'Build row by row using the previous row'
    ],
    companies: ['Apple', 'Amazon', 'Microsoft']
  },
  {
    id: 'valid-palindrome',
    title: 'Valid Palindrome',
    difficulty: 'Easy',
    description: `A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string s, return true if it is a palindrome, or false otherwise.`,
    constraints: [
      '1 ≤ s.length ≤ 2 * 10⁵',
      's consists only of printable ASCII characters'
    ],
    examples: [
      {
        input: 's = "A man, a plan, a canal: Panama"',
        output: 'true',
        explanation: '"amanaplanacanalpanama" is a palindrome.'
      },
      {
        input: 's = "race a car"',
        output: 'false',
        explanation: '"raceacar" is not a palindrome.'
      },
      {
        input: 's = " "',
        output: 'true',
        explanation: 'After removing non-alphanumeric characters, s becomes an empty string "" which is a palindrome.'
      }
    ],
    testCases: [
      { input: '"A man, a plan, a canal: Panama"', expectedOutput: 'true' },
      { input: '"race a car"', expectedOutput: 'false' },
      { input: '" "', expectedOutput: 'true' }
    ],
    tags: ['Two Pointers', 'String'],
    acceptance: 47.1,
    submissions: 3847392,
    hints: [
      'Use two pointers from start and end',
      'Convert to lowercase and skip non-alphanumeric characters',
      'Compare characters and move pointers inward'
    ],
    companies: ['Facebook', 'Microsoft', 'Amazon']
  },
  {
    id: 'single-number',
    title: 'Single Number',
    difficulty: 'Easy',
    description: `Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.

You must implement a solution with a linear runtime complexity and use only constant extra space.`,
    constraints: [
      '1 ≤ nums.length ≤ 3 * 10⁴',
      '-3 * 10⁴ ≤ nums[i] ≤ 3 * 10⁴',
      'Each element in the array appears twice except for one element which appears only once'
    ],
    examples: [
      {
        input: 'nums = [2,2,1]',
        output: '1'
      },
      {
        input: 'nums = [4,1,2,1,2]',
        output: '4'
      },
      {
        input: 'nums = [1]',
        output: '1'
      }
    ],
    testCases: [
      { input: '[2,2,1]', expectedOutput: '1' },
      { input: '[4,1,2,1,2]', expectedOutput: '4' },
      { input: '[1]', expectedOutput: '1' }
    ],
    tags: ['Array', 'Bit Manipulation'],
    acceptance: 70.1,
    submissions: 4647392,
    hints: [
      'Use XOR operation - a ^ a = 0',
      'XOR all elements together',
      'Duplicate numbers will cancel out, leaving only the single number'
    ],
    companies: ['Airbnb', 'Palantir', 'Amazon']
  },
  {
    id: 'linked-list-cycle',
    title: 'Linked List Cycle',
    difficulty: 'Easy',
    description: `Given head, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.

Return true if there is a cycle in the linked list. Otherwise, return false.`,
    constraints: [
      'The number of the nodes in the list is in the range [0, 10⁴]',
      '-10⁵ ≤ Node.val ≤ 10⁵',
      'pos is -1 or a valid index in the linked-list'
    ],
    examples: [
      {
        input: 'head = [3,2,0,-4], pos = 1',
        output: 'true',
        explanation: 'There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).'
      },
      {
        input: 'head = [1,2], pos = 0',
        output: 'true',
        explanation: 'There is a cycle in the linked list, where the tail connects to the 0th node.'
      },
      {
        input: 'head = [1], pos = -1',
        output: 'false',
        explanation: 'There is no cycle in the linked list.'
      }
    ],
    testCases: [
      { input: '[3,2,0,-4], 1', expectedOutput: 'true' },
      { input: '[1,2], 0', expectedOutput: 'true' },
      { input: '[1], -1', expectedOutput: 'false' }
    ],
    tags: ['Hash Table', 'Linked List', 'Two Pointers'],
    acceptance: 48.9,
    submissions: 4447392,
    hints: [
      'Use Floyd\'s cycle detection algorithm (tortoise and hare)',
      'Use two pointers: slow (1 step) and fast (2 steps)',
      'If there\'s a cycle, fast will eventually meet slow'
    ],
    companies: ['Amazon', 'Microsoft', 'Bloomberg']
  }
];

export const allTags = Array.from(
  new Set(problems.flatMap(p => p.tags))
).sort();