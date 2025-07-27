import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchChallenge } from '@/services/api/challengeRoutes';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Flag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ChallengeDetail {
  id: string;
  title: string;
  description: string;
  points: number;
//   longDescription: string;
//   difficulty: string;
//   imageUrl?: string;
//   requirements: string[];
//   submissionGuidelines: string;
//   deadline?: string;
}

function ChallengeDetail() {
  const { challengeId } = useParams<{ challengeId: string }>();
  const [challenge, setChallenge] = useState<ChallengeDetail>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [userPoints, setUserPoints] = useState(85); // Current user points

  useEffect(() => {
    const getChallenge = async () => {
      try {
        setLoading(true);
        const response = await fetchChallenge(challengeId!);
        console.log(response)
        // if (response instanceof ChallengeDetail){
        setChallenge(response);
        console.log(challenge)
        // }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load challenge');
      } finally {
        setLoading(false);
      }
    };

    if (challengeId) {
      getChallenge();
    }
  }, [challengeId]);

  const handleSubmit = async (challengeId: string, pointsEarned: number) => {
    try {
      // Submit challenge completion to your API
      
      // Navigate to congratulations page with data
      if (challenge){
        navigate('/congratulations', {
          state: {
            challengeTitle: challenge.title,
            pointsEarned: challenge.points,
            previousPoints: userPoints
          }
        });
      }
      
      
      // Update user points locally
      setUserPoints(prev => prev + pointsEarned);
      
    } catch (error) {
      console.error('Failed to submit challenge:', error);
    }
  };

  if (loading) return <div>Loading challenge...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!challenge) return <div>Challenge not found</div>;

  return (
    <div>
      <Flag size="48px" />
      <h1>{challenge.title}</h1>
      <p>{challenge.description}</p>
      <Badge>+{challenge.points} pts</Badge>
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="email">Notes</Label>
        <Textarea placeholder="Add your notes of what you accomplished." />
      </div>
      <Button onClick={() => handleSubmit(challenge.id, challenge.points)}>Submit</Button>
        {/* <section>
          <h2>Requirements</h2>
          <ul>
            {challenge.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </section> */}
        
        {/* <section>
          <h2>Submission Guidelines</h2>
          <p>{challenge.submissionGuidelines}</p>
        </section>
        
        {challenge.deadline && (
          <section>
            <h2>Deadline</h2>
            <p>{new Date(challenge.deadline).toLocaleDateString()}</p>
          </section>
        )} */}
    </div>
  );
};

export default ChallengeDetail;