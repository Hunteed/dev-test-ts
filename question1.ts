/*
   Hunteed is a recruitement platform where "employers" can publish "jobs", so that
   "hunters" can look for candidates that match the job offer. When a hunter finds a good
   candidate, he/she can send the candidate's resume via our platform, through an object called a "referral".
   If the candidate matches the employer's expectations, then the candidate can be hired, and the hunter earns
   a reward that corresponds to the job offer.

   Any hunter can send an applicant's resume for a job, by creating a `referral` object.
   The resulting referral can have one of the following statuses:

   - 'submitted' : the CV has been submitted to the employer and is waiting to be reviewed.
   - 'interview' : the employer approved the resume, and intends to meet the applicant.
   - 'declined' : the employer declined the applicant; either after reading the resume, or after an interview.
   - 'hired' : the employer hired the applicant.

   While in status 'submitted' or 'interview', the applicant has a chance to be hired later on.
   Only one applicant can be hired per job. When a referral's status is set to 'hired', then
   the other referrals are automatically set to 'declined'. Therefore, there can be at max. 1 referral
   per job in status 'hired'.

   When an applicant is hired, then the corresponding hunter earns the reward of the job, described by `job.reward.hunterGets`

   QUESTION: Write a public function `potentialGain` that will compute the potential gain of a hunter, amongst the provided `jobs`;
   that is, the maximum reward amount that a hunter can earn if everything goes perfect for him/her.

   CODING DIRECTIONS:
   - feel free to take use the latest ES6/ES7/typescript features
   - a functional style is always appreciated (although not mandatory)

 */

// Referral interface

type ReferralStatus = "submitted" | "interview" | "declined" | "hired";

interface Referral {
  // id of the referral
  _id: string;

  hunter: {
    // id of the hunter that referred this applicant
    _id: string;
  };

  // current status of this referral
  status: ReferralStatus;
}

// Job interface
interface Job {
  // id of the job
  _id: string;

  // the amount the hunter will earn, in case his/her referral goes to 'hired'
  reward: {
    hunterGets: number;
  };

  // async method that returns all the referrals associated with this job
  getReferrals: () => Promise<Referral[]>;
}

class HunteedTest {
  public async potentialGain(hunterId: string, jobs: Job[]): Promise<number> {
    let hunterRewards = 0;
    for (const job of jobs) {
      const referrals = await job.getReferrals()
      for (const referral of referrals) {
        if (referral._id === hunterId && referral.status === "hired") {
          hunterRewards += job.reward.hunterGets
        }
      }
    }
    return hunterRewards;
  }
}
