import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Code } from 'lucide-react';

const Account = () => {
  const users = useStore((s) => s.users);
  const currentUserId = useStore((s) => s.currentUserId);
  const updateProfile = useStore((s) => s.updateProfile);
  const isLoggedIn = useStore((s) => s.isLoggedIn);
  const navigate = useNavigate();

  const user = users.find((u) => u.id === currentUserId);

  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [message, setMessage] = useState('');

  if (!isLoggedIn) {
    navigate('/login');
    return null;
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, email, avatar });
    setMessage('Profile updated!');
    setEditMode(false);
  };

  const handleCancel = () => {
    setName(user?.name || '');
    setEmail(user?.email || '');
    setAvatar(user?.avatar || '');
    setEditMode(false);
    setMessage('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-hero">
      <div className="flex items-center space-x-2 mb-8">
        <Code className="h-8 w-8 text-primary" />
        <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          CodeForge
        </span>
      </div>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Account Info</CardTitle>
        </CardHeader>
        {!editMode ? (
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center mb-4">
              {user?.avatar && (
                <img src={user.avatar} alt="Avatar" className="w-20 h-20 rounded-full mb-2 border" />
              )}
              <div className="text-lg font-semibold">{user?.name}</div>
              <div className="text-muted-foreground">{user?.email}</div>
            </div>
            <div className="flex flex-col gap-2">
              <div><span className="font-medium">Username:</span> {user?.username}</div>
              <div><span className="font-medium">Name:</span> {user?.name}</div>
              <div><span className="font-medium">Email:</span> {user?.email}</div>
              <div><span className="font-medium">Avatar URL:</span> {user?.avatar || 'Not set'}</div>
            </div>
            <Button className="mt-6 w-full" variant="gradient" onClick={() => setEditMode(true)}>
              Edit
            </Button>
          </CardContent>
        ) : (
          <form onSubmit={handleSave}>
            <CardContent className="space-y-4">
              <Input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="text"
                placeholder="Avatar URL (optional)"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
              />
              {message && <div className="text-success text-sm">{message}</div>}
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button type="submit" className="w-full" variant="gradient">Save</Button>
              <Button type="button" className="w-full" variant="outline" onClick={handleCancel}>Cancel</Button>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  );
};

export default Account; 