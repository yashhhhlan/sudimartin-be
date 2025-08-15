import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  try {
    const token = request.cookies.get('access-token')?.value;
    const path = request.nextUrl.pathname;

    if (!token) {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }

    const res = await fetch(`${process.env.BASE_URL}/permissions/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }

    const { data: permissions } = await res.json();

    const hasAccess = checkPermissionForPath(path, permissions);

    if (!hasAccess) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }
}

function checkPermissionForPath(path: string, permissions: any) {
  const pathPermissionMap: { [key: string]: { name: string; category: string } } = {
    // media monitoring
    '/dashboard/media-monitoring/overview': { name: 'Overview', category: 'Media Monitoring' },
    '/dashboard/media-monitoring/dashboard': { name: 'Dashboard', category: 'Media Monitoring' },
    '/dashboard/media-monitoring/content': { name: 'Content', category: 'Media Monitoring' },
    '/dashboard/media-monitoring/history': { name: 'History', category: 'Media Monitoring' },
    '/dashboard/media-monitoring/analysis': { name: 'Analysis', category: 'Media Monitoring' },
    '/dashboard/media-monitoring/sentiment': { name: 'Sentiment', category: 'Media Monitoring' },
    '/dashboard/media-monitoring/topic': { name: 'Topic', category: 'Media Monitoring' },
    '/dashboard/media-monitoring/influencer': { name: 'Influencer', category: 'Media Monitoring' },
    '/dashboard/media-monitoring/map-interaction': { name: 'Map Interaction', category: 'Media Monitoring' },
    '/dashboard/media-monitoring/map-distribution': { name: 'Map Distribution', category: 'Media Monitoring' },

    // ai analysis
    '/dashboard/media-monitoring/ai-analysis': { name: 'AI Analysis', category: 'AI Analysis' },

    // report
    '/dashboard/media-monitoring/excel': { name: 'Excel', category: 'Report' },
    '/dashboard/media-monitoring/pdf': { name: 'PDF', category: 'Report' },

    // administrator
    '/dashboard/administrator/upload-digital/domain': { name: 'Domain', category: 'Administrator' },
    '/dashboard/administrator/upload-digital/mention': { name: 'Mention', category: 'Administrator' },
    '/dashboard/administrator/upload-digital/pop-mention': { name: 'Pop Mention', category: 'Administrator' },
    '/dashboard/administrator/upload-digital/pop-account-dl': { name: 'Pop Account DL', category: 'Administrator' },
    '/dashboard/administrator/upload-digital/hashtag': { name: 'Hashtag DL', category: 'Administrator' },
    '/dashboard/administrator/upload-digital/web-visits': { name: 'Web Visits', category: 'Administrator' },
    '/dashboard/administrator/upload-digital/project-name': { name: 'Project Name', category: 'Administrator' },
    '/dashboard/administrator/upload-digital/summary': { name: 'Summary', category: 'Administrator' },
    '/dashboard/administrator/upload-digital/topic': { name: 'Topic', category: 'Administrator' },
    '/dashboard/administrator/upload-digital/metric': { name: 'Metric', category: 'Administrator' },
    '/dashboard/administrator/upload-digital/emotion': { name: 'Emotion', category: 'Administrator' },

    '/dashboard/administrator/demo-request': { name: 'Demo Request', category: 'Administrator' },
    '/dashboard/administrator/notification': { name: 'Notification', category: 'Administrator' },
    '/dashboard/administrator/support': { name: 'Support', category: 'Administrator' },
    '/dashboard/administrator/user-account': { name: 'User Account', category: 'Administrator' },
    '/dashboard/administrator/user-report': { name: 'User Report', category: 'Administrator' },
  };

  const requiredPermission = pathPermissionMap[path];
  if (!requiredPermission) return true;

  return permissions[requiredPermission.category]?.some(
    (permission: any) => permission.name === requiredPermission.name,
  );
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
