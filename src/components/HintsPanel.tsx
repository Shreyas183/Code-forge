import { useState } from 'react';
import { Lightbulb, ChevronDown, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { motion, AnimatePresence } from 'framer-motion';

interface HintsPanelProps {
  hints: string[];
  onHintRevealed?: (hintIndex: number) => void;
}

const HintsPanel = ({ hints, onHintRevealed }: HintsPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [revealedHints, setRevealedHints] = useState<Set<number>>(new Set());

  const revealHint = (index: number) => {
    if (!revealedHints.has(index)) {
      setRevealedHints(prev => new Set([...prev, index]));
      onHintRevealed?.(index);
    }
  };

  const revealAllHints = () => {
    const allIndexes = Array.from({ length: hints.length }, (_, i) => i);
    setRevealedHints(new Set(allIndexes));
    allIndexes.forEach(index => {
      if (!revealedHints.has(index)) {
        onHintRevealed?.(index);
      }
    });
  };

  if (!hints || hints.length === 0) {
    return null;
  }

  return (
    <Card className="bg-gradient-card border-border/50">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="w-full justify-between p-4 h-auto hover:bg-muted/50"
          >
            <div className="flex items-center gap-3">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              <div className="text-left">
                <h3 className="text-sm font-medium text-foreground">Hints</h3>
                <p className="text-xs text-muted-foreground">
                  {revealedHints.size} / {hints.length} revealed
                </p>
              </div>
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="px-4 pb-4 space-y-3">
            {revealedHints.size > 0 && (
              <Alert className="border-amber-200 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-950/50">
                <Lightbulb className="h-4 w-4 text-amber-600" />
                <AlertDescription className="text-amber-800 dark:text-amber-200">
                  Using hints may affect your problem-solving score. Try to solve without them first!
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              {hints.map((hint, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {revealedHints.has(index) ? (
                    <div className="p-3 bg-muted/30 rounded-lg border border-border/50">
                      <div className="flex items-start gap-2">
                        <Badge variant="secondary" className="text-xs">
                          Hint {index + 1}
                        </Badge>
                        <Eye className="h-3 w-3 text-muted-foreground mt-0.5" />
                      </div>
                      <p className="text-sm text-foreground mt-2">{hint}</p>
                    </div>
                  ) : (
                    <div className="p-3 bg-muted/10 rounded-lg border border-dashed border-border/50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            Hint {index + 1}
                          </Badge>
                          <EyeOff className="h-3 w-3 text-muted-foreground" />
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => revealHint(index)}
                          className="text-xs"
                        >
                          Reveal
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Click "Reveal" to show hint {index + 1}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {revealedHints.size < hints.length && (
              <Button
                variant="outline"
                size="sm"
                onClick={revealAllHints}
                className="w-full mt-3 gap-2"
              >
                <Eye className="h-4 w-4" />
                Reveal All Hints
              </Button>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default HintsPanel;